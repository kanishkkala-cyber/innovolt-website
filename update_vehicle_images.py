import pandas as pd
from supabase import create_client, Client
import os
from dotenv import load_dotenv
import sys

# Fix Windows console encoding
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = 'https://samlhxirwartjigfscdd.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhbWxoeGlyd2FydGppZ2ZzY2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MjI0NzIsImV4cCI6MjA3NTQ5ODQ3Mn0.hDiUktONYWRNfEfZdjXmYAMnqqr_z2q1oSPHEG6pYpA'

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Please set SUPABASE_URL and SUPABASE_KEY in your .env file")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def update_vehicle_images():
    """Read Excel file and update vehicle images in Supabase"""
    
    # First, let's check what vehicles we have in the database
    print("Checking database for existing vehicles...")
    db_vehicles = supabase.table('Vehicles').select('id, Registration_No').limit(10).execute()
    print(f"\nSample vehicles in database:")
    for v in db_vehicles.data[:5]:
        print(f"  - ID: {v['id']}, Reg: {v.get('Registration_No', 'N/A')}")
    
    # Read the Excel file
    excel_file = 'src/Audit Responses oct 2025.xlsx'
    
    try:
        df = pd.read_excel(excel_file)
        print(f"\nLoaded {len(df)} rows from Excel file")
        
        # Display first few registration numbers from Excel
        print("\nFirst 10 registration numbers from Excel:")
        for idx, reg in enumerate(df['Registration Number '].head(10)):
            print(f"  {idx+1}. '{reg}'")
        
        # Expected column names (based on actual Excel file structure)
        registration_col = 'Registration Number '  # Note the trailing space
        front_image_col = 'Vehicle Front (direct)'
        left_image_col = 'Vehicle Left (direct)'
        right_image_col = 'Vehicle Right (direct)'
        back_image_col = 'Vehicle Right Back (direct)'
        
        # Check if columns exist
        if registration_col not in df.columns:
            print(f"\nError: Column '{registration_col}' not found in Excel file")
            print("Available columns:", df.columns.tolist())
            return
        
        # Update count variables
        updated_count = 0
        not_found_count = 0
        error_count = 0
        
        # Process each row
        for idx, row in df.iterrows():
            try:
                registration_no = row[registration_col]
                
                # Skip if registration number is empty
                if pd.isna(registration_no):
                    continue
                
                # Get image URLs
                front_image = row.get(front_image_col, '') if front_image_col in df.columns else ''
                left_image = row.get(left_image_col, '') if left_image_col in df.columns else ''
                right_image = row.get(right_image_col, '') if right_image_col in df.columns else ''
                back_image = row.get(back_image_col, '') if back_image_col in df.columns else ''
                
                # Skip if no images
                if not any([front_image, left_image, right_image, back_image]):
                    continue
                
                # Convert to string and handle NaN
                def clean_value(val):
                    if pd.isna(val):
                        return None
                    url = str(val).strip()
                    # Convert Google Drive export/view URLs to direct download format
                    if 'drive.google.com' in url:
                        # Extract file ID from various Google Drive URL formats
                        file_id = None
                        if 'uc?export=view&id=' in url:
                            file_id = url.split('uc?export=view&id=')[1].split('&')[0]
                        elif 'file/d/' in url:
                            file_id = url.split('file/d/')[1].split('/')[0]
                        elif 'id=' in url:
                            file_id = url.split('id=')[1].split('&')[0]
                        
                        if file_id:
                            # Use Google Drive's file content URL format
                            # This works when file is shared as "Anyone with the link can view"
                            # Format: https://drive.google.com/uc?export=view&id=FILE_ID
                            url = f'https://drive.google.com/uc?export=view&id={file_id}'
                    return url if url else None
                
                # Update the vehicle in Supabase using Registration_No
                update_data = {}
                
                if front_image and not pd.isna(front_image):
                    update_data['image_url_1'] = clean_value(front_image)
                
                if left_image and not pd.isna(left_image):
                    update_data['image_url_2'] = clean_value(left_image)
                
                if right_image and not pd.isna(right_image):
                    update_data['image_url_3'] = clean_value(right_image)
                
                if back_image and not pd.isna(back_image):
                    update_data['image_url_4'] = clean_value(back_image)
                
                # Update in Supabase - first try to find by Registration_No
                if update_data:
                    # Try to find the vehicle by Registration_No first
                    search_result = supabase.table('Vehicles').select('id').eq('Registration_No', registration_no).execute()
                    
                    if search_result.data and len(search_result.data) > 0:
                        # Found the vehicle, now update it
                        vehicle_id = search_result.data[0]['id']
                        result = supabase.table('Vehicles').update(update_data).eq('id', vehicle_id).execute()
                        
                        if result.data:
                            updated_count += 1
                            print(f"[OK] Updated vehicle {registration_no} (ID: {vehicle_id})")
                        else:
                            error_count += 1
                            print(f"[ERROR] Failed to update vehicle {registration_no}")
                    else:
                        not_found_count += 1
                        print(f"[NOT FOUND] Vehicle not found: {registration_no}")
                        
            except Exception as e:
                error_count += 1
                print(f"[ERROR] Error processing row {idx}: {str(e)}")
        
        # Print summary
        print("\n" + "="*50)
        print("UPDATE SUMMARY")
        print("="*50)
        print(f"Successfully updated: {updated_count} vehicles")
        print(f"Not found: {not_found_count} vehicles")
        print(f"Errors: {error_count} vehicles")
        print("="*50)
        
    except Exception as e:
        print(f"Error reading Excel file: {str(e)}")

if __name__ == "__main__":
    update_vehicle_images()
