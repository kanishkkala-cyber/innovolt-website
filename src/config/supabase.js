import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

console.log('🔧 Supabase Config:', { 
  url: supabaseUrl, 
  keySet: !!supabaseKey,
  keyLength: supabaseKey?.length || 0,
  isPlaceholder: supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder'),
  envVars: {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not Set'
  }
})

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Database table names
export const TABLES = {
  VEHICLES: 'Vehicles', // Back to capital V - this is correct!
  LEADS: 'leads'
}

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && supabaseKey !== 'placeholder-key'
}

// Helper functions for common operations
export const supabaseHelpers = {
  // Get all vehicles
  async getVehicles(filters = {}) {
    console.log('🚗 Supabase Helper: Starting getVehicles with filters:', filters);
    console.log('🔧 Supabase Helper: Table name:', TABLES.VEHICLES);
    
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase Helper: Supabase not configured, returning empty array')
      return []
    }

    try {
      console.log('🔍 Supabase Helper: Building query...');
      
      // First, let's test if we can access any data at all
      console.log('🧪 Testing basic Supabase access...');
      const testQuery = supabase.from(TABLES.VEHICLES).select('count', { count: 'exact' });
      const { count, error: countError } = await testQuery;
      console.log('📊 Table count test:', { count, countError: countError?.message });
      
      let query = supabase.from(TABLES.VEHICLES).select('*')
      
      // Apply filters
      if (filters.city && filters.city !== 'all') {
        console.log('🏙️ Supabase Helper: Adding city filter:', filters.city);
        query = query.eq('City', filters.city)
      }
      
      if (filters.brand && filters.brand !== 'all') {
        console.log('🏭 Supabase Helper: Adding brand filter:', filters.brand);
        query = query.eq('OEM', filters.brand)
      }
      
      // Apply sorting
      if (filters.sortBy) {
        console.log('📊 Supabase Helper: Adding sort:', filters.sortBy);
        switch (filters.sortBy) {
          case 'price-low':
            query = query.order('Selling Price', { ascending: true })
            break
          case 'price-high':
            query = query.order('Selling Price', { ascending: false })
            break
          case 'year-new':
            query = query.order('Registration date', { ascending: false })
            break
          case 'year-old':
            query = query.order('Registration date', { ascending: true })
            break
          case 'km-low':
            query = query.order('Kms run', { ascending: true })
            break
          default:
            // Default sorting
            break
        }
      }
      
      // Apply limit
      if (filters.limit) {
        console.log('📏 Supabase Helper: Adding limit:', filters.limit);
        query = query.limit(filters.limit)
      }
      
      console.log('🚀 Supabase Helper: Executing query...');
      const { data, error } = await query
      
      console.log('📊 Supabase Helper: Query result:', {
        dataCount: data?.length || 0,
        error: error?.message || null,
        firstVehicle: data?.[0] ? {
          Registration_No: data[0].Registration_No,
          OEM: data[0].OEM,
          Model: data[0].Model,
          City: data[0].City
        } : null
      });
      
      if (error) {
        console.error('❌ Supabase Helper: Query error:', error);
        throw new Error(`Failed to fetch vehicles: ${error.message}`)
      }
      
      console.log('✅ Supabase Helper: Successfully fetched', data?.length || 0, 'vehicles');
      return data || []
    } catch (error) {
      console.error('❌ Supabase Helper: Error in getVehicles:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      return []
    }
  },

  // Get single vehicle by registration number
  async getVehicleByRegNo(regNo) {
    console.log('🚗 Supabase Helper: Starting getVehicleByRegNo for:', regNo);
    
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase Helper: Supabase not configured, returning null')
      return null
    }

    try {
      console.log('🔍 Supabase Helper: Building single vehicle query...');
      const { data, error } = await supabase
        .from(TABLES.VEHICLES)
        .select('*')
        .eq('Registration_No', regNo)
        .single()
      
      console.log('📊 Supabase Helper: Single vehicle query result:', {
        data: data ? {
          Registration_No: data.Registration_No,
          OEM: data.OEM,
          Model: data.Model,
          City: data.City
        } : null,
        error: error?.message || null
      });
      
      if (error) {
        console.error('❌ Supabase Helper: Single vehicle query error:', error);
        throw new Error(`Failed to fetch vehicle: ${error.message}`)
      }
      
      console.log('✅ Supabase Helper: Successfully fetched single vehicle:', data?.Registration_No);
      return data
    } catch (error) {
      console.error('❌ Supabase Helper: Error in getVehicleByRegNo:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      return null
    }
  },

  // Create a lead
  async createLead(leadData) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, simulating lead creation')
      return { id: Date.now(), ...leadData }
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.LEADS)
        .insert([leadData])
        .select()
      
      if (error) {
        throw new Error(`Failed to create lead: ${error.message}`)
      }
      
      return data[0]
    } catch (error) {
      console.warn('Error creating lead:', error.message)
      throw error
    }
  },

  // Get leads
  async getLeads() {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty array')
      return []
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.LEADS)
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        throw new Error(`Failed to fetch leads: ${error.message}`)
      }
      
      return data || []
    } catch (error) {
      console.warn('Error fetching leads:', error.message)
      return []
    }
  }
}

export default supabase