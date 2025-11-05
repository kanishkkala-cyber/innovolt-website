"""
Upload vehicle images to Supabase Storage
This script uploads images and updates the database with file paths

Usage:
    python upload_images_to_supabase_storage.py <vehicle_id> <image_path_1> [<image_path_2> ...]

Example:
    python upload_images_to_supabase_storage.py 510c3150-9afa-4a45-b150-d67ee17e2b95 image1.jpg image2.jpg image3.jpg
"""

import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client
from pathlib import Path


def get_supabase() -> Client:
    """Initialize Supabase client"""
    load_dotenv()
    url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")
    
    if not url or not key:
        print("❌ Error: Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file")
        sys.exit(1)
    
    return create_client(url, key)


def upload_image_to_storage(supabase: Client, bucket_name: str, file_path: str, vehicle_id: str, image_number: int) -> str:
    """Upload an image to Supabase Storage and return the file path"""
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return None
    
    # Generate storage path: vehicle-images/{vehicle_id}/image_{number}.{ext}
    file_ext = Path(file_path).suffix.lower()
    storage_path = f"{vehicle_id}/image_{image_number}{file_ext}"
    
    try:
        # Read file
        with open(file_path, 'rb') as f:
            file_data = f.read()
        
        # Upload to Supabase Storage
        result = supabase.storage.from_(bucket_name).upload(
            storage_path,
            file_data,
            file_options={
                "content-type": f"image/{file_ext[1:]}",  # image/jpeg, image/png, etc.
                "upsert": "true"  # Overwrite if exists
            }
        )
        
        print(f"✅ Uploaded: {storage_path}")
        return storage_path
        
    except Exception as e:
        print(f"❌ Error uploading {file_path}: {e}")
        return None


def update_vehicle_image_paths(supabase: Client, vehicle_id: str, image_paths: list, table_name: str = "Vehicles"):
    """Update vehicle record with image paths in database"""
    update_data = {}
    
    for i, path in enumerate(image_paths, start=1):
        if path:
            update_data[f"image_url_{i}"] = path
    
    if not update_data:
        print("❌ No image paths to update")
        return False
    
    try:
        result = supabase.table(table_name).update(update_data).eq("id", vehicle_id).execute()
        
        if result.data:
            print(f"✅ Updated vehicle {vehicle_id} with image paths")
            print(f"   Updated columns: {list(update_data.keys())}")
            return True
        else:
            print("❌ Update returned no data")
            return False
            
    except Exception as e:
        print(f"❌ Error updating database: {e}")
        return False


def main():
    if len(sys.argv) < 3:
        print("Usage: python upload_images_to_supabase_storage.py <vehicle_id> <image_path_1> [<image_path_2> ...]")
        print("\nExample:")
        print("  python upload_images_to_supabase_storage.py 510c3150-9afa-4a45-b150-d67ee17e2b95 image1.jpg image2.jpg")
        sys.exit(1)
    
    vehicle_id = sys.argv[1]
    image_files = sys.argv[2:]
    bucket_name = "vehicle-images"  # Change if your bucket has different name
    
    print(f"📤 Uploading {len(image_files)} images for vehicle: {vehicle_id}")
    print(f"📦 Using bucket: {bucket_name}\n")
    
    supabase = get_supabase()
    
    # Check if bucket exists
    try:
        buckets = supabase.storage.list_buckets()
        bucket_exists = any(b.name == bucket_name for b in buckets)
        if not bucket_exists:
            print(f"❌ Bucket '{bucket_name}' not found!")
            print(f"💡 Create it in Supabase Dashboard: Storage → New Bucket → Name: {bucket_name} → Public")
            sys.exit(1)
    except Exception as e:
        print(f"⚠️  Could not verify bucket existence: {e}")
        print("   Continuing anyway...\n")
    
    # Upload images
    uploaded_paths = []
    for i, image_file in enumerate(image_files, start=1):
        print(f"📸 Uploading image {i}/{len(image_files)}: {image_file}")
        path = upload_image_to_storage(supabase, bucket_name, image_file, vehicle_id, i)
        if path:
            uploaded_paths.append(path)
        print()
    
    if not uploaded_paths:
        print("❌ No images were uploaded successfully")
        sys.exit(1)
    
    # Update database
    print("💾 Updating database...")
    success = update_vehicle_image_paths(supabase, vehicle_id, uploaded_paths)
    
    if success:
        print(f"\n✅ Successfully uploaded {len(uploaded_paths)} images!")
        print(f"   Vehicle ID: {vehicle_id}")
        print(f"   Image paths stored in: image_url_1, image_url_2, etc.")
    else:
        print("\n❌ Images uploaded but database update failed")
        sys.exit(1)


if __name__ == "__main__":
    main()


