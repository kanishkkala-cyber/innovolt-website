# Supabase Images Setup Guide

## 🎯 Best Solution: Supabase Storage (Recommended)

Supabase Storage is the **best way** to store and serve images. It's fast, reliable, and free up to a certain limit.

### Step 1: Create Storage Bucket in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Storage** → **Buckets**
3. Click **New Bucket**
4. Name: `vehicle-images`
5. Make it **Public** (so images can be accessed without authentication)
6. Click **Create Bucket**

### Step 2: Upload Images

**Option A: Via Supabase Dashboard**
1. Go to **Storage** → **vehicle-images**
2. Click **Upload File**
3. Upload your vehicle images
4. Note the file path (e.g., `vehicle-1-image-1.jpg`)

**Option B: Via API (using the script provided)**
- Use the upload script we'll create

### Step 3: Store Image Paths in Database

Instead of storing full URLs, store just the file paths in your `image_url_1`, `image_url_2`, etc. columns:
- ✅ Good: `vehicle-123-image-1.jpg`
- ❌ Bad: `https://yourproject.supabase.co/storage/v1/object/public/vehicle-images/vehicle-123-image-1.jpg`

### Step 4: The Code Will Auto-Generate URLs

The helper functions will automatically convert file paths to full Supabase Storage URLs.

---

## 📦 Alternative Solutions

### Option 2: External URLs (CDN, Google Drive, etc.)
- Store full URLs in `image_url_1`, `image_url_2`, etc.
- The code will handle them automatically

### Option 3: Bytea Columns (Not Recommended)
- Only use for very small images (< 100KB)
- Can slow down database queries
- Better to use Supabase Storage

---

## 🔧 How to Use

After setup, the images will automatically work in:
- Vehicle listing cards
- Vehicle detail page
- Comparison views

The helper functions handle:
- Supabase Storage paths → Full URLs
- External URLs → Direct use
- Bytea data → Base64 data URLs
- Fallback to placeholder if image fails


