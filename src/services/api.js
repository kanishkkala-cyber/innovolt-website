import { supabaseHelpers } from '../config/supabase';

const apiService = {
  // Submit contact form (creates a lead without vehicle reference)
  submitContact: async (formData) => {
    try {
      const leadData = {
        name: formData.name,
        phone_number: formData.phone,
        city: formData.city,
        vehicle_reg_no: null, // No vehicle reference for contact form
        lead_type: 'contact_form',
        created_at: new Date().toISOString()
      };

      const result = await supabaseHelpers.createLead(leadData);
      
      return {
        success: true,
        message: 'Contact form submitted successfully!',
        data: result
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to submit contact form');
    }
  },

  // Submit callback request (creates a lead without vehicle reference)
  submitCallback: async (formData) => {
    try {
      const leadData = {
        name: formData.name,
        phone_number: formData.phone,
        city: formData.city,
        vehicle_reg_no: null, // No vehicle reference for callback
        lead_type: 'callback_request',
        created_at: new Date().toISOString()
      };

      const result = await supabaseHelpers.createLead(leadData);
      
      return {
        success: true,
        message: 'Callback request submitted successfully!',
        data: result
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to submit callback request');
    }
  },

  // Submit lead capture (creates a lead with vehicle reference)
  submitLead: async (leadData) => {
    try {
      const leadPayload = {
        name: leadData.name,
        phone_number: leadData.phone,
        city: leadData.city,
        vehicle_reg_no: leadData.vehicleRegNo, // Reference to specific vehicle
        lead_type: 'vehicle_inquiry',
        created_at: new Date().toISOString()
      };

      const result = await supabaseHelpers.createLead(leadPayload);
      
      return {
        success: true,
        message: 'Lead submitted successfully!',
        data: result
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to submit lead');
    }
  },

  // Get cars/vehicles from Supabase
  getCars: async (filters = {}) => {
    console.log('🚗 API Service: Starting getCars with filters:', filters);
    
    try {
      console.log('🔍 API Service: Calling supabaseHelpers.getVehicles...');
      const vehicles = await supabaseHelpers.getVehicles(filters);
      
      console.log('📊 API Service: Received vehicles from Supabase:', {
        count: vehicles?.length || 0,
        vehicles: vehicles?.slice(0, 2) // Log first 2 vehicles for debugging
      });
      
      // If no vehicles from Supabase, return sample data
      if (!vehicles || vehicles.length === 0) {
        console.warn('⚠️ API Service: No vehicles found, returning sample data');
        return [
          {
            id: 'SAMPLE001',
            title: '2022 Piaggio Ape E-City',
            image: '/placeholder-vehicle.svg',
            kilometers: '28.5k km',
            price: '₹2.45 lakh',
            emi: '₹8,900/m*',
            location: 'Mumbai, Maharashtra',
            brand: 'Piaggio',
            year: '2022',
            registrationYear: '2022',
            vehicleNumber: 'SAMPLE001',
            modelType: 'E-City',
            loadCapacity: '300 kg',
            batteryCapacity: '3.5 kwt',
            chargingTime: '6 hours',
            topSpeed: '45 km/h',
            images: ['/placeholder-vehicle.svg']
          },
          {
            id: 'SAMPLE002',
            title: '2023 Euler HiLoad',
            image: '/placeholder-vehicle.svg',
            kilometers: '15.8k km',
            price: '₹3.85 lakh',
            emi: '₹15,200/m*',
            location: 'Delhi, Delhi',
            brand: 'Euler',
            year: '2023',
            registrationYear: '2023',
            vehicleNumber: 'SAMPLE002',
            modelType: 'HiLoad',
            loadCapacity: '500 kg',
            batteryCapacity: '4.2 kwt',
            chargingTime: '8 hours',
            topSpeed: '55 km/h',
            images: ['/placeholder-vehicle.svg']
          }
        ];
      }
      
      console.log('✅ API Service: Transforming Supabase data...');
      // Transform Supabase data to match frontend expectations
      const transformedVehicles = vehicles.map(vehicle => {
        console.log('🔄 Transforming vehicle:', vehicle.Registration_No);
        console.log('📋 Available columns:', Object.keys(vehicle));
        console.log('🔍 Sample data:', {
          Registration_No: vehicle.Registration_No,
          OEM: vehicle.OEM,
          Model: vehicle.Model,
          'Registration date': vehicle['Registration date'],
          'Kms run': vehicle['Kms run'],
          'Selling Price': vehicle['Selling Price'],
          EMI: vehicle.EMI,
          City: vehicle.City
        });
        
        const transformed = {
          id: vehicle.Registration_No, // Use registration number as ID
          title: `${new Date(vehicle['Registration date']).getFullYear()} ${vehicle.OEM} ${vehicle.Model}`,
          image: '/placeholder-vehicle.svg', // Placeholder since no photos
          kilometers: `${(vehicle['Kms run'] / 1000).toFixed(1)}k km`,
          price: vehicle['Selling Price'],
          emi: vehicle.EMI,
          location: `${vehicle.City}, ${vehicle.State}`, // Show city and state
          brand: vehicle.OEM,
          year: new Date(vehicle['Registration date']).getFullYear().toString(),
          registrationYear: new Date(vehicle['Registration date']).getFullYear().toString(),
          vehicleNumber: vehicle.Registration_No,
          images: ['/placeholder-vehicle.svg'], // Placeholder image
          // Additional Supabase fields - using exact column names from schema
          model: vehicle.Model,
          modelType: vehicle['Model Type'],
          mainStage: vehicle['Main Stage'],
          state: vehicle.State,
          registrationDate: vehicle['Registration date'],
          seizedDate: vehicle['Seized date'],
          inventoryDays: vehicle['Inventory days'],
          loadCapacity: vehicle['Load Capacity (kg)'],
          batteryCapacity: vehicle['Battery Capacity (kwt)'],
          chargingTime: vehicle['Charging time (hours)'],
          topSpeed: vehicle['Top Speed (km/h)']
        };
        
        // Validate critical fields
        if (!vehicle.Registration_No || !vehicle.OEM || !vehicle.Model) {
          console.warn('⚠️ Missing critical fields for vehicle:', vehicle.Registration_No);
        }
        
        console.log('✅ Transformed vehicle:', transformed.title);
        return transformed;
      });

      console.log('🎉 API Service: Successfully transformed', transformedVehicles.length, 'vehicles');
      return transformedVehicles;
    } catch (error) {
      console.error('❌ API Service: Error fetching vehicles:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      
      // Return sample data as fallback
      console.log('🔄 API Service: Returning fallback sample data');
      return [
        {
          id: 'SAMPLE001',
          title: '2022 Piaggio Ape E-City',
          image: '/placeholder-vehicle.svg',
          kilometers: '28.5k km',
          price: '₹2.45 lakh',
          emi: '₹8,900/m*',
          location: 'Mumbai, Maharashtra',
          brand: 'Piaggio',
          year: '2022',
          registrationYear: '2022',
          vehicleNumber: 'SAMPLE001',
          modelType: 'E-City',
          loadCapacity: '300 kg',
          batteryCapacity: '3.5 kwt',
          chargingTime: '6 hours',
          topSpeed: '45 km/h',
          images: ['/placeholder-vehicle.svg']
        }
      ];
    }
  },

  // Get single vehicle by ID (registration number)
  getCar: async (id) => {
    console.log('🚗 API Service: Starting getCar for ID:', id);
    
    try {
      console.log('🔍 API Service: Calling supabaseHelpers.getVehicleByRegNo...');
      const vehicle = await supabaseHelpers.getVehicleByRegNo(id);
      
      console.log('📊 API Service: Received vehicle from Supabase:', vehicle);
      
      if (!vehicle) {
        console.warn('⚠️ API Service: Vehicle not found, returning sample data');
        return {
          id: 'SAMPLE001',
          title: '2022 Piaggio Ape E-City',
          image: '/placeholder-vehicle.svg',
          kilometers: '28.5k km',
          price: '₹2.45 lakh',
          emi: '₹8,900/m*',
          location: 'Mumbai, Maharashtra',
          brand: 'Piaggio',
          year: '2022',
          registrationYear: '2022',
          vehicleNumber: 'SAMPLE001',
          modelType: 'E-City',
          loadCapacity: '300 kg',
          batteryCapacity: '3.5 kwt',
          chargingTime: '6 hours',
          topSpeed: '45 km/h',
          images: ['/placeholder-vehicle.svg']
        };
      }

      console.log('✅ API Service: Transforming single vehicle...');
      // Transform to match frontend expectations
      const transformed = {
        id: vehicle.Registration_No,
        title: `${new Date(vehicle['Registration date']).getFullYear()} ${vehicle.OEM} ${vehicle.Model}`,
        image: '/placeholder-vehicle.svg',
        kilometers: `${(vehicle['Kms run'] / 1000).toFixed(1)}k km`,
        price: vehicle['Selling Price'],
        emi: vehicle.EMI,
        location: `${vehicle.City}, ${vehicle.State}`, // Show city and state
        brand: vehicle.OEM,
        year: new Date(vehicle['Registration date']).getFullYear().toString(),
        registrationYear: new Date(vehicle['Registration date']).getFullYear().toString(),
        vehicleNumber: vehicle.Registration_No,
        images: ['/placeholder-vehicle.svg'],
        // Additional Supabase fields - using exact column names from schema
        model: vehicle.Model,
        modelType: vehicle['Model Type'],
        mainStage: vehicle['Main Stage'],
        state: vehicle.State,
        registrationDate: vehicle['Registration date'],
        seizedDate: vehicle['Seized date'],
        inventoryDays: vehicle['Inventory days'],
        loadCapacity: vehicle['Load Capacity (kg)'],
        batteryCapacity: vehicle['Battery Capacity (kwt)'],
        chargingTime: vehicle['Charging time (hours)'],
        topSpeed: vehicle['Top Speed (km/h)']
      };
      
      console.log('🎉 API Service: Successfully transformed vehicle:', transformed.title);
      return transformed;
    } catch (error) {
      console.error('❌ API Service: Error fetching single vehicle:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      
      // Return sample data as fallback
      console.log('🔄 API Service: Returning fallback sample data for single vehicle');
      return {
        id: 'SAMPLE001',
        title: '2022 Piaggio Ape E-City',
        image: '/placeholder-vehicle.svg',
        kilometers: '28.5k km',
        price: '₹2.45 lakh',
        emi: '₹8,900/m*',
        location: 'Innovolt Hub, Mumbai',
        brand: 'Piaggio',
        year: '2022',
        registrationYear: '2022',
        vehicleNumber: 'SAMPLE001',
        modelType: 'E-City',
        loadCapacity: '300 kg',
        batteryCapacity: '3.5 kwt',
        chargingTime: '6 hours',
        topSpeed: '45 km/h',
        images: ['/placeholder-vehicle.svg']
      };
    }
  },

  // Health check (for compatibility)
  healthCheck: async () => {
    try {
      await supabaseHelpers.getVehicles({ limit: 1 });
      return { status: 'OK', message: 'Supabase connection successful' };
    } catch (error) {
      throw new Error('Supabase connection failed');
    }
  },

  // Get comparison data for multiple vehicles
  async getComparisonData(vehicleIds) {
    try {
      console.log('🔍 API Service: Fetching comparison data for vehicles:', vehicleIds);
      
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .in('Registration_No', vehicleIds);
      
      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      console.log('✅ API Service: Comparison data fetched:', data?.length || 0, 'vehicles');

      // Transform the data for comparison
      const comparisonData = data.map(vehicle => ({
        id: vehicle.Registration_No,
        title: `${new Date(vehicle['Registration date']).getFullYear()} ${vehicle.OEM} ${vehicle.Model}`,
        image: '/placeholder-vehicle.svg',
        price: vehicle['Selling Price'],
        emi: vehicle.EMI,
        kilometers: `${(vehicle['Kms run'] / 1000).toFixed(1)}k km`,
        location: `${vehicle.City}, ${vehicle.State}`,
        brand: vehicle.OEM,
        year: new Date(vehicle['Registration date']).getFullYear().toString(),
        registrationYear: new Date(vehicle['Registration date']).getFullYear().toString(),
        vehicleNumber: vehicle.Registration_No,
        // Additional comparison fields
        batteryCapacity: vehicle['Battery Capacity (kwt)'] || 'N/A',
        chargingTime: vehicle['Charging time (hours)'] || 'N/A',
        topspeed: vehicle['Top Speed'] || 'N/A',
        loadCapacity: vehicle['Load Capacity (kg)'] || 'N/A',
        owners: vehicle['No. of Owners'] || 'N/A'
      }));

      return {
        success: true,
        data: comparisonData,
        count: comparisonData.length
      };
    } catch (error) {
      console.error('❌ API Service: Error fetching comparison data:', error);
      throw new Error('Failed to fetch comparison data');
    }
  }
};

export default apiService;