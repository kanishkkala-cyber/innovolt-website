# Postman Testing Guide for Supabase API

## 🎯 Goal
Test if your Supabase API is returning all 298 vehicles or if there's a limit.

---

## 📋 Step-by-Step Instructions

### **Step 1: Download and Install Postman**

1. Go to https://www.postman.com/downloads/
2. Download Postman for Windows
3. Install it
4. Open Postman (you can skip creating an account for now)

---

### **Step 2: Create a New Request**

1. In Postman, click **"New"** button (top left)
2. Select **"HTTP Request"**
3. You'll see a new tab with a request setup

---

### **Step 3: Set Up Your Supabase API Call**

#### **A. Set the HTTP Method:**
- Make sure it's set to **GET** (should be default)

#### **B. Enter the URL:**
1. In the URL field, enter:
   ```
   https://samlhxirwartjigfscdd.supabase.co/rest/v1/Vehicles
   ```
   (Replace with your actual Supabase project URL if different)

#### **C. Add Headers:**
1. Click on the **"Headers"** tab (below the URL)
2. Add these two headers:

   **Header 1:**
   - Key: `apikey`
   - Value: `[YOUR_SUPABASE_ANON_KEY]`
   - ✅ Check the box to enable it
   
   **Header 2:**
   - Key: `Authorization`
   - Value: `Bearer [YOUR_SUPABASE_ANON_KEY]`
   - ✅ Check the box to enable it
   - (Same anon key as above)

   **Where to get your anon key:**
   - Go to Supabase Dashboard
   - Settings → API
   - Copy the "anon public" key

#### **D. Set Query Parameters (to get ALL vehicles):**
1. Click on the **"Params"** tab (next to Headers)
2. Add these parameters:

   **Parameter 1:**
   - Key: `select`
   - Value: `*`
   - ✅ Check the box

   **Parameter 2:**
   - Key: `limit`
   - Value: `500`
   - ✅ Check the box
   - (This requests up to 500 records)

---

### **Step 4: Send the Request**

1. Click the blue **"Send"** button (top right)
2. Wait for the response (should appear below)

---

### **Step 5: Check the Response**

You'll see several sections:

#### **A. Status Code:**
- Should show **200 OK** (green)
- If you see 401 or 403 → Your API key is wrong
- If you see 404 → URL is wrong

#### **B. Response Body:**
- Scroll down to see the actual data
- You'll see a JSON array of vehicles `[{...}, {...}, ...]`
- **Count the items** or look at the array length

#### **C. Response Headers:**
- Look for `content-range` header
- It might show: `content-range: 0-299/298`
- This tells you: showing items 0-299 out of 298 total

---

### **Step 6: Count the Results**

**Option A: Manual Count**
- Scroll through the JSON response
- Count the objects (each vehicle is an object in the array)

**Option B: Use Postman's Test Script**
1. Click on the **"Tests"** tab (next to Headers)
2. Paste this code:
   ```javascript
   pm.test("Check vehicle count", function () {
       var jsonData = pm.response.json();
       console.log("Total vehicles returned: " + jsonData.length);
       pm.expect(jsonData.length).to.be.above(0);
   });
   ```
3. Send the request again
4. Look at the **"Test Results"** tab below - it will show the count

---

## 🔍 What to Look For

### **If you see fewer than 298 vehicles:**

1. **Check the `content-range` header:**
   - If it says `0-216/298` → API is limiting results
   - If it says `0-297/298` → API returned almost all

2. **Check for pagination:**
   - Supabase might be paginating results
   - Try adding `&offset=0` and `&limit=500` parameters

3. **Check RLS (Row-Level Security):**
   - Some vehicles might be hidden by security policies
   - Check Supabase Dashboard → Authentication → Policies

### **If you see exactly 298 vehicles:**
- ✅ API is working correctly
- The issue is in the frontend transformation/filtering

---

## 🧪 Advanced Testing

### **Test 1: Get Total Count Only**
```
URL: https://samlhxirwartjigfscdd.supabase.co/rest/v1/Vehicles?select=*&limit=1
Headers: Same as above
```

Then check `content-range` header - it should show total count like `0-0/298`

### **Test 2: Get with Range**
```
URL: https://samlhxirwartjigfscdd.supabase.co/rest/v1/Vehicles?select=*
Headers: Add new header:
  - Key: `Range`
  - Value: `0-499`
```

This explicitly requests first 500 records.

---

## 📸 Quick Screenshot Guide

**Your Postman window should look like:**
```
┌─────────────────────────────────────┐
│ GET │ [URL field]          │ Send  │
├─────────────────────────────────────┤
│ Params │ Headers │ Body │ Pre-request │
├─────────────────────────────────────┤
│ [Headers table with apikey & Auth]  │
├─────────────────────────────────────┤
│ [Response appears here after Send]  │
└─────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

**Problem: "401 Unauthorized"**
- ✅ Check your API key is correct
- ✅ Make sure both headers are added
- ✅ Check the "Bearer" prefix in Authorization header

**Problem: "404 Not Found"**
- ✅ Check the URL is correct
- ✅ Make sure table name is `Vehicles` (capital V)
- ✅ Check your Supabase project ID

**Problem: Empty response `[]`**
- ✅ Check RLS policies in Supabase
- ✅ Verify you have data in the table
- ✅ Check if filters are being applied

**Problem: Can't see response**
- ✅ Make sure you clicked "Send"
- ✅ Check the response format (JSON/Text)
- ✅ Look at the "Body" tab below

---

## 📊 Expected Results

**Good Response:**
```json
[
  {
    "id": "uuid-1",
    "OEM": "Piaggio",
    "Model": "Ape E-City",
    ...
  },
  {
    "id": "uuid-2",
    ...
  },
  // ... 296 more vehicles
]
```

**Count:** Should show 298 objects in the array

---

## 💡 Pro Tips

1. **Save the Request:**
   - Click "Save" button
   - Name it "Get All Vehicles"
   - You can reuse it later

2. **Use Collection:**
   - Create a "Supabase API" collection
   - Save all your API tests there

3. **Check Response Time:**
   - Look at the response time (bottom right)
   - If it's slow (>2 seconds), might indicate performance issues

4. **Export for Sharing:**
   - File → Export
   - Share the request with your team

---

**Need help?** Share a screenshot of your Postman response and I can help debug!


