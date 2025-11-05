# Vehicle Image Update Script

This Python script reads image URLs from an Excel file and updates your Supabase database.

## Prerequisites

1. Install Python 3.7 or higher
2. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Setup

1. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_service_role_key
   ```

2. Ensure your Excel file is located at: `src/Audit Responses oct 2025.xlsx`

3. Verify the Excel file has these columns:
   - Column D: `Registration Number`
   - `Vehicle Front (direct)` → will be stored as `image_url_1`
   - `Vehicle Left (direct)` → will be stored as `image_url_2`
   - `Vehicle Right (direct)` → will be stored as `image_url_3`
   - `Vehicle Right Back (direct)` → will be stored as `image_url_4`

## Running the Script

```bash
python update_vehicle_images.py
```

The script will:
1. Read the Excel file
2. Display all column names (for verification)
3. Update each vehicle in Supabase based on Registration Number
4. Print a summary of updates

## Notes

- The script matches vehicles using the `Registration_No` column in your Supabase database
- Empty or missing image URLs will be skipped
- The script will print progress and show which vehicles were updated successfully
