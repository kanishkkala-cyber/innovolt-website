import React, { useState, useEffect } from 'react';
import { supabaseHelpers } from '../config/supabase';

const SupabaseTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testConnection = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    addResult('🔍 Starting Supabase connection test...', 'info');
    
    try {
      // Check environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      addResult(`📋 Supabase URL: ${supabaseUrl ? '✅ Set' : '❌ Not set'}`, supabaseUrl ? 'success' : 'error');
      addResult(`📋 Supabase Key: ${supabaseKey ? '✅ Set' : '❌ Not set'}`, supabaseKey ? 'success' : 'error');
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')) {
        addResult('⚠️ Supabase not configured - using sample data', 'warning');
        setIsLoading(false);
        return;
      }
      
      // Test vehicle fetch
      addResult('🚗 Testing vehicle fetch...', 'info');
      const vehicles = await supabaseHelpers.getVehicles({ limit: 1 });
      addResult(`✅ Vehicles fetched: ${vehicles.length} vehicles found`, 'success');
      
      if (vehicles.length > 0) {
        addResult(`📄 Sample vehicle: ${vehicles[0].OEM} ${vehicles[0].Model}`, 'success');
      }
      
      // Test leads fetch
      addResult('📝 Testing leads fetch...', 'info');
      const leads = await supabaseHelpers.getLeads();
      addResult(`✅ Leads fetched: ${leads.length} leads found`, 'success');
      
      addResult('🎉 Supabase connection successful!', 'success');
      
    } catch (error) {
      addResult(`❌ Supabase connection failed: ${error.message}`, 'error');
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🔧 Supabase Connection Test</h2>
      
      <button 
        onClick={testConnection} 
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {isLoading ? 'Testing...' : 'Test Supabase Connection'}
      </button>
      
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p>Click the button above to test your Supabase connection.</p>
        ) : (
          <div>
            {testResults.map((result, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: '5px',
                  color: result.type === 'error' ? '#dc2626' : 
                         result.type === 'success' ? '#059669' : 
                         result.type === 'warning' ? '#d97706' : '#374151'
                }}
              >
                <span style={{ fontSize: '12px', color: '#6b7280' }}>[{result.timestamp}]</span> {result.message}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e0f2fe', borderRadius: '5px' }}>
        <h4>📋 Environment Variables:</h4>
        <p><strong>VITE_SUPABASE_URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</p>
        <p><strong>VITE_SUPABASE_ANON_KEY:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set (hidden)' : 'Not set'}</p>
      </div>
    </div>
  );
};

export default SupabaseTest;
