# Supabase Integration Setup Guide

## 🚀 Initial Setup Complete!

I've set up the Supabase integration for your Innovolt project. Here's what has been configured:

### ✅ **What's Been Set Up:**

1. **Supabase Client Configuration** (`src/config/supabase.js`)
   - Supabase client setup
   - Helper functions for database operations
   - Table mappings for `Vehicles` and `leads`

2. **Updated API Service** (`src/services/api.js`)
   - Replaced backend API calls with Supabase operations
   - Data transformation to match frontend expectations
   - Lead creation with proper vehicle references

3. **Updated Forms:**
   - **CallPopup**: Name, Phone, City fields
   - **Contact Page**: Name, Phone, City fields  
   - **Vehicle Page**: Name, Phone, City fields (with vehicle reference)

4. **Placeholder Images**: Created SVG placeholder for vehicles

### 🔧 **Next Steps - Complete the Setup:**

#### 1. **Get Your Supabase Credentials:**
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy your Project URL and anon public key

#### 2. **Create Environment File:**
   ```bash
   # Copy the example file
   cp supabase.env.example .env
   
   # Edit .env with your actual credentials
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

#### 3. **Database Schema Verification:**
   Your Supabase tables should match this structure:

   **`Vehicles` Table:**
   - `Registration_No` (Primary Key, text)
   - `OEM` (text)
   - `Model` (text)
   - `Model Type` (text)
   - `Main Stage` (text)
   - `City` (text)
   - `State` (text)
   - `Registration date` (date)
   - `Seized date` (date)
   - `Inventory days` (numeric)
   - `Kms run` (numeric)
   - `Selling Price` (text)
   - `EMI` (text)
   - `Load Capacity (kg)` (int8)
   - `Battery Capacity (kwt)` (float8)
   - `Charging time (hours)` (float8)
   - `Top Speed (km/h)` (int8)

   **`leads` Table:**
   - `id` (Primary Key, int4)
   - `name` (text)
   - `phone_number` (varchar)
   - `city` (text)
   - `vehicle_reg_no` (text, Foreign Key to Vehicles.Registration_No)
   - `lead_type` (text)
   - `created_at` (timestamp)

#### 4. **Test the Integration:**
   ```bash
   # Start the frontend
   npm run dev
   
   # Test the forms and vehicle loading
   ```

### 🎯 **How It Works:**

1. **Vehicle Data**: Loaded from Supabase `Vehicles` table
2. **Contact/Callback Leads**: Created in `leads` table with `vehicle_reg_no = null`
3. **Vehicle-Specific Leads**: Created in `leads` table with `vehicle_reg_no` reference
4. **Lead Types**:
   - `contact_form` - From Contact page
   - `callback_request` - From Call Us popup
   - `vehicle_inquiry` - From specific vehicle page

### 🔍 **Data Flow:**

```
Frontend Forms → Supabase API → leads Table
                     ↓
Frontend Vehicle Display ← Supabase API ← Vehicles Table
```

### 📝 **Notes:**

- **No Photos**: Using SVG placeholder images for now
- **Registration Numbers**: Used as vehicle IDs for routing
- **Lead Tracking**: All form submissions create leads with proper categorization
- **Backend Removed**: No longer need Node.js backend for data operations

### 🚨 **Important:**

Make sure to:
1. Add your Supabase credentials to `.env`
2. Verify your database schema matches the expected structure
3. Test all forms and vehicle loading
4. Check that leads are being created properly in Supabase

The integration is ready - just add your Supabase credentials and you're good to go! 🎉
