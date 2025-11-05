import base64
import os
import re
import sys
import time
from typing import Optional

import requests
from dotenv import load_dotenv
from supabase import create_client, Client


def extract_drive_file_id(url: str) -> Optional[str]:
    """Extract a Google Drive file ID from common URL formats."""
    # Examples:
    # https://drive.google.com/file/d/<FILE_ID>/view?usp=drivesdk
    # https://drive.google.com/open?id=<FILE_ID>
    # https://drive.google.com/uc?id=<FILE_ID>&export=view
    patterns = [
        r"/file/d/([a-zA-Z0-9_-]+)/",
        r"[?&]id=([a-zA-Z0-9_-]+)",
        r"/uc\?[^#]*id=([a-zA-Z0-9_-]+)"
    ]
    for pat in patterns:
        m = re.search(pat, url)
        if m:
            return m.group(1)
    return None


def download_drive_file_bytes(file_id: str, timeout: int = 60) -> bytes:
    """Download a Google Drive file by file_id and return raw bytes.

    Handles Google Drive's download confirmation for large files.
    """
    session = requests.Session()
    base = "https://drive.google.com/uc?export=download"
    params = {"id": file_id}

    # First request (may return a confirmation token for large files)
    resp = session.get(base, params=params, stream=True, timeout=timeout)
    resp.raise_for_status()

    confirm_token = None
    for k, v in resp.cookies.items():
        if k.startswith("download_warning"):
            confirm_token = v
            break

    if confirm_token:
        params["confirm"] = confirm_token
        resp = session.get(base, params=params, stream=True, timeout=timeout)
        resp.raise_for_status()

    # Read content into bytes
    chunks = []
    for chunk in resp.iter_content(chunk_size=1024 * 1024):  # 1MB chunks
        if chunk:
            chunks.append(chunk)
    return b"".join(chunks)


def get_supabase() -> Client:
    load_dotenv()
    url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")
    if not url or not key:
        print("Error: Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY) in your environment.")
        sys.exit(1)
    return create_client(url, key)


def update_vehicle_image_bytea(
    registration_no: str,
    image_bytes: bytes,
    column_name: str = "image_bytea_1",
    table_name: str = "Vehicles",
) -> None:
    supabase = get_supabase()

    # Find the row by Registration_No
    sel = supabase.table(table_name).select("id, Registration_No").eq("Registration_No", registration_no).execute()
    if not sel.data:
        print(f"No vehicle found with Registration_No={registration_no}")
        sys.exit(1)

    vehicle_id = sel.data[0]["id"]

    # Update bytea column
    # PostgREST/Supabase requires bytea to be sent as base64-encoded string
    # The format should be: base64 string that PostgREST will decode to bytea
    base64_encoded = base64.b64encode(image_bytes).decode('utf-8')
    
    print(f"Attempting to update with base64 string (length: {len(base64_encoded)})...")
    
    # PostgREST expects bytea columns to receive base64-encoded strings
    # Send as plain base64 string
    update_payload = {column_name: base64_encoded}
    
    try:
        upd = supabase.table(table_name).update(update_payload).eq("id", vehicle_id).execute()
        print("✅ Update successful with base64 format!")
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Error with base64 format: {error_msg}")
        
        if "not found" in error_msg.lower() or "column" in error_msg.lower():
            print(f"\n⚠️  Column '{column_name}' might not exist in the table.")
            print(f"Please create it first with:")
            print(f"  ALTER TABLE \"{table_name}\" ADD COLUMN {column_name} bytea;")
        
        # Alternative: Try using hex format (PostgreSQL hex bytea format)
        print("\nTrying alternative: PostgreSQL hex format...")
        try:
            hex_string = image_bytes.hex()
            # PostgreSQL hex bytea format: \x followed by hex string
            bytea_hex = f'\\x{hex_string}'
            update_payload_hex = {column_name: bytea_hex}
            upd = supabase.table(table_name).update(update_payload_hex).eq("id", vehicle_id).execute()
            print("✅ Update successful with hex format!")
        except Exception as hex_error:
            print(f"❌ Hex format also failed: {hex_error}")
            print("\n💡 Solution: Create an RPC function in Supabase.")
            print("Run the SQL from 'create_bytea_update_function.sql' in your Supabase SQL Editor.")
            print("Then this script will use the RPC function automatically.")
            
            # Try RPC function as last resort
            try:
                print("\nAttempting to use RPC function...")
                result = supabase.rpc('update_vehicle_image_bytea', {
                    'p_vehicle_id': vehicle_id,
                    'p_image_base64': base64_encoded,
                    'p_column_name': column_name
                }).execute()
                print("✅ Update successful using RPC function!")
                upd = type('obj', (object,), {'data': [{'success': True}]})()
            except Exception as rpc_error:
                print(f"❌ RPC function also failed: {rpc_error}")
                print("\n📝 Please run 'create_bytea_update_function.sql' in Supabase SQL Editor first.")
                raise

    if upd.data:
        print(f"Updated vehicle {registration_no} (ID: {vehicle_id}) -> column '{column_name}' with {len(image_bytes)} bytes")
    else:
        print("Update returned no data; verify the column exists and has type bytea.")


def main():
    if len(sys.argv) < 3:
        print(
            "Usage: python upload_image_to_supabase.py <GOOGLE_DRIVE_URL> <REGISTRATION_NO> [<BYTEA_COLUMN_NAME>]"
        )
        print("Example:")
        print(
            "  python upload_image_to_supabase.py "
            "https://drive.google.com/file/d/1J1wi8sSTHbnLY7uzFSGw-HR_lt_njVia/view?usp=drivesdk "
            "DL51EV0366 image_bytea_1"
        )
        sys.exit(1)

    drive_url = sys.argv[1].strip()
    reg_no = sys.argv[2].strip()
    column = sys.argv[3].strip() if len(sys.argv) >= 4 else "image_bytea_1"

    file_id = extract_drive_file_id(drive_url)
    if not file_id:
        print("Error: Could not extract Google Drive file ID from the provided URL.")
        sys.exit(1)

    print(f"Downloading file_id={file_id} from Google Drive...")
    img_bytes = download_drive_file_bytes(file_id)
    print(f"Downloaded {len(img_bytes)} bytes")

    print(f"Updating Supabase for Registration_No={reg_no} column={column}...")
    update_vehicle_image_bytea(reg_no, img_bytes, column_name=column)
    print("Done.")


if __name__ == "__main__":
    main()


