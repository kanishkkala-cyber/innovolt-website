import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

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
    if (!isSupabaseConfigured()) {
      return []
    }

    try {
      // Add range to get all records (Supabase defaults to 1000 max, increase if needed)
      // Exclude Registration_No from select for privacy/compliance
      let query = supabase.from(TABLES.VEHICLES)
        .select('id, OEM, Model, "Model Type", "Main Stage", City, State, "Registration date", "Seized date", "Inventory days", "Kms run", "Selling Price", EMI, "Load Capacity (kg)", "Battery Capacity (kwt)", "Charging time (hours)", "Top Speed (km/h)", image_url_1, image_url_2, image_url_3, image_url_4', { count: 'exact' })
        .range(0, 4999)
      
      // Apply filters
      if (filters.city && filters.city !== 'all') {
        query = query.eq('City', filters.city)
      }
      
      if (filters.brand && filters.brand !== 'all') {
        query = query.eq('OEM', filters.brand)
      }
      
      // Apply sorting
      if (filters.sortBy) {
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
        query = query.limit(filters.limit)
      }
      
      const { data, error, count } = await query
      
      if (error) {
        throw new Error(`Failed to fetch vehicles: ${error.message}`)
      }
      
      console.log(`📦 [SUPABASE] Fetched ${data?.length || 0} vehicles from database (Total in DB: ${count || 'unknown'})`);
      
      return data || []
    } catch (error) {
      return []
    }
  },

  // Get single vehicle by UUID
  async getVehicleById(id) {
    if (!isSupabaseConfigured()) {
      return null
    }

    try {
      // Exclude Registration_No from select for privacy/compliance
      const { data, error } = await supabase
        .from(TABLES.VEHICLES)
        .select('id, OEM, Model, "Model Type", "Main Stage", City, State, "Registration date", "Seized date", "Inventory days", "Kms run", "Selling Price", EMI, "Load Capacity (kg)", "Battery Capacity (kwt)", "Charging time (hours)", "Top Speed (km/h)", image_url_1, image_url_2, image_url_3, image_url_4')
        .eq('id', id)
        .single()
      
      if (error) {
        throw new Error(`Failed to fetch vehicle: ${error.message}`)
      }
      
      return data
    } catch (error) {
      return null
    }
  },

  // Legacy function for backward compatibility (deprecated)
  async getVehicleByRegNo(regNo) {
    return this.getVehicleById(regNo);
  },

  // Create a lead
  async createLead(leadData) {
    if (!isSupabaseConfigured()) {
      return { id: Date.now(), ...leadData }
    }

    try {
      // Log the data being sent for debugging
      console.log('🔍 [SUPABASE] Creating lead with data:', leadData);
      
      const { data, error } = await supabase
        .from(TABLES.LEADS)
        .insert([leadData])
        .select()
      
      if (error) {
        console.error('❌ [SUPABASE] Error creating lead:', error);
        console.error('❌ [SUPABASE] Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Failed to create lead: ${error.message}${error.details ? ` - ${error.details}` : ''}${error.hint ? ` (Hint: ${error.hint})` : ''}`)
      }
      
      console.log('✅ [SUPABASE] Lead created successfully:', data[0]);
      return data[0]
    } catch (error) {
      console.error('❌ [SUPABASE] Exception in createLead:', error);
      throw error
    }
  },

  // Get leads
  async getLeads() {
    if (!isSupabaseConfigured()) {
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
      return []
    }
  }
}

export default supabase