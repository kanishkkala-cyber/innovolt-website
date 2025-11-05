# Supabase Storage Setup Guide - Complete Instructions

## ✅ What You've Done So Far:
1. ✅ Created bucket: `Vehicle-images` (or `vehicle-images`)
2. ✅ Uploaded 1 image
3. ✅ Changed `image_url_1` column from `bytea` to `text`
4. ✅ Stored URL in database for vehicle `5117e01c-9133-4f07-a9bb-e72dbbac03b2`

## 📋 Step-by-Step Guide

### Step 1: Verify Your Supabase Storage URL Format

When you upload an image to Supabase Storage, you get a URL like:
```
https://[your-project-id].supabase.co/storage/v1/object/public/Vehicle-images/[file-path]
```

**Two ways to store it:**

#### Option A: Store FULL URL (Easiest - Recommended)
```
https://samlhxirwartjigfscdd.supabase.co/storage/v1/object/public/Vehicle-images/vehicle-id/image-1.jpg
```
- ✅ Just copy-paste the full URL from Supabase Storage
- ✅ Works immediately, no conversion needed

#### Option B: Store FILE PATH Only (More Flexible)
```
vehicle-id/image-1.jpg
```
- ✅ The code will automatically convert to full URL
- ✅ If you change your Supabase project, just update the env variable

### Step 2: Get the Public URL from Supabase Storage

1. Go to **Supabase Dashboard → Storage → Vehicle-images**
2. Click on your uploaded image
3. You'll see the file details
4. Copy the **Public URL** (should look like: `https://[project].supabase.co/storage/v1/object/public/Vehicle-images/...`)

### Step 3: Store the URL in Database

**If using FULL URL:**
- Just paste the full URL directly into `image_url_1`, `image_url_2`, etc.

**If using FILE PATH:**
- Store just the path: `5117e01c-9133-4f07-a9bb-e72dbbac03b2/image-1.jpg`
- The code will automatically prepend your Supabase URL

### Step 4: Upload More Images

For each vehicle:
1. Upload images to Storage: `Vehicle-images/[vehicle-id]/image-1.jpg`
2. Store either:
   - Full URL in database, OR
   - Just the file path: `[vehicle-id]/image-1.jpg`

### Step 5: Test It

Refresh your browser and check:
- Vehicle listing page → Should show images
- Vehicle detail page → Should show all 4 images
- Console → Should show successful image loads

## 🔧 Code Configuration

The code automatically:
1. Detects if it's a full URL → Uses directly
2. Detects if it's a file path → Converts to full Supabase Storage URL
3. Handles bucket name case-insensitively (Vehicle-images or vehicle-images)

## 📝 Recommended Structure

**Folder structure in Storage:**
```
Vehicle-images/
  ├── 5117e01c-9133-4f07-a9bb-e72dbbac03b2/
  │   ├── image-1.jpg
  │   ├── image-2.jpg
  │   ├── image-3.jpg
  │   └── image-4.jpg
  ├── [other-vehicle-id]/
  │   └── ...
```

**Database storage (using FILE PATH method - Recommended):**
- `image_url_1`: `5117e01c-9133-4f07-a9bb-e72dbbac03b2/image-1.jpg`
- `image_url_2`: `5117e01c-9133-4f07-a9bb-e72dbbac03b2/image-2.jpg`
- `image_url_3`: `5117e01c-9133-4f07-a9bb-e72dbbac03b2/image-3.jpg`
- `image_url_4`: `5117e01c-9133-4f07-a9bb-e72dbbac03b2/image-4.jpg`

## ⚠️ Important Notes

1. **Bucket must be PUBLIC** - Check in Supabase Storage settings
2. **Column type must be TEXT** (you already changed it ✅)
3. **File naming**: Use consistent naming like `image-1.jpg`, `image-2.jpg`
4. **Case sensitivity**: Bucket name might be case-sensitive in some cases

## 🚀 Quick Start

1. Upload your image to `Vehicle-images/[vehicle-id]/image-1.jpg`
2. Get the Public URL or just note the file path
3. Update your database:
   ```sql
   UPDATE "Vehicles" 
   SET image_url_1 = '[full-url-or-path]'
   WHERE id = '5117e01c-9133-4f07-a9bb-e72dbbac03b2';
   ```
4. Refresh frontend → Image should appear!


