/**
 * Image Helper Utility for Supabase
 * Handles different image sources: Supabase Storage, External URLs, and Bytea
 */

import { supabase } from '../config/supabase';

/**
 * Get a public URL from Supabase Storage
 * @param {string} bucketName - Name of the storage bucket
 * @param {string} filePath - Path to the file in storage
 * @returns {string} Public URL
 */
export const getSupabaseStorageUrl = (bucketName, filePath) => {
  if (!bucketName || !filePath) return null;
  
  try {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    return data?.publicUrl || null;
  } catch (error) {
    console.error('Error getting Supabase Storage URL:', error);
    return null;
  }
};

/**
 * Convert bytea data to base64 data URL
 * @param {string} byteaData - Base64 encoded bytea string
 * @returns {string} Data URL
 */
export const byteaToDataUrl = (byteaData) => {
  if (!byteaData) return null;
  
  try {
    // If already a data URL, return as is
    if (byteaData.startsWith('data:')) {
      return byteaData;
    }
    
    // If it's base64 string, convert to data URL
    // Determine MIME type (default to jpeg)
    const mimeType = 'image/jpeg'; // Default, you can detect from first bytes if needed
    
    return `data:${mimeType};base64,${byteaData}`;
  } catch (error) {
    console.error('Error converting bytea to data URL:', error);
    return null;
  }
};

/**
 * Get image URL from various sources
 * Priority: Supabase Storage > Bytea > External URL
 * @param {string|object} imageSource - Can be URL string, Supabase Storage path object, or bytea data
 * @param {object} options - Options for image retrieval
 * @returns {string|null} Image URL or data URL
 */
export const getImageUrl = (imageSource, options = {}) => {
  if (!imageSource) return null;
  
  const { 
    bucketName = 'vehicle-images', // Default bucket name
    defaultImage = '/placeholder-vehicle.svg'
  } = options;
  
  // If it's already a valid URL (http/https)
  if (typeof imageSource === 'string') {
    // Check if it's a Supabase Storage path (starts with bucket name or just filename)
    if (imageSource.includes('/') && !imageSource.startsWith('http')) {
      // Likely a Supabase Storage path
      const url = getSupabaseStorageUrl(bucketName, imageSource);
      return url || defaultImage;
    }
    
    // Check if it's a data URL
    if (imageSource.startsWith('data:')) {
      return imageSource;
    }
    
    // External URL - validate and return
    if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      return imageSource;
    }
    
    // Try as Supabase Storage path
    const url = getSupabaseStorageUrl(bucketName, imageSource);
    if (url) return url;
  }
  
  // If it's an object with bytea data
  if (typeof imageSource === 'object' && imageSource.bytea) {
    return byteaToDataUrl(imageSource.bytea);
  }
  
  // Fallback to default
  return defaultImage;
};

/**
 * Get all images for a vehicle
 * @param {object} vehicle - Vehicle object with image columns
 * @returns {string[]} Array of image URLs
 */
export const getVehicleImages = (vehicle) => {
  if (!vehicle) return [];
  
  const images = [];
  const imageColumns = ['image_url_1', 'image_url_2', 'image_url_3', 'image_url_4'];
  
  imageColumns.forEach(column => {
    const imageUrl = getImageUrl(vehicle[column]);
    if (imageUrl && imageUrl !== '/placeholder-vehicle.svg') {
      images.push(imageUrl);
    }
  });
  
  // Also check bytea columns if they exist
  const byteaColumns = ['image_bytea_1', 'image_bytea_2', 'image_bytea_3', 'image_bytea_4'];
  byteaColumns.forEach(column => {
    if (vehicle[column]) {
      const dataUrl = byteaToDataUrl(vehicle[column]);
      if (dataUrl) {
        images.push(dataUrl);
      }
    }
  });
  
  return images.length > 0 ? images : ['/placeholder-vehicle.svg'];
};

/**
 * Preload images for better performance
 * @param {string[]} imageUrls - Array of image URLs
 * @returns {Promise<void>}
 */
export const preloadImages = async (imageUrls) => {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  });
  
  await Promise.allSettled(promises);
};


