import React, { useState, useEffect, useMemo } from 'react';
import { useGlobal } from '../contexts/GlobalContext';
import apiService from '../services/api';

const ComparisonResultsPopup = ({ open, onClose, onBack }) => {
  const { comparedCars } = useGlobal();
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allCars, setAllCars] = useState([]);
  
  // Fetch cars from the same source as the rest of the app
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await apiService.getCars();
        setAllCars(cars);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
        // Show empty array instead of dummy data
        setAllCars([]);
      }
    };

    if (open) {
      fetchCars();
    }
  }, [open]);

  // Get actual car data for compared cars - memoized to prevent infinite loops
  const selectedCars = useMemo(() => {
    return allCars.filter(car => comparedCars.includes(car.id));
  }, [allCars, comparedCars]);

  // Enhanced parameters for comparison with proper labels
  const parameters = [
    { key: 'price', label: 'Selling Price', type: 'price' },
    { key: 'emi', label: 'EMI Available', type: 'price' },
    { key: 'batteryCapacity', label: 'Battery Capacity', type: 'numeric' },
    { key: 'chargingTime', label: 'Charging Time', type: 'time' },
    { key: 'kilometers', label: 'Kilometers Driven', type: 'numeric' },
    { key: 'topSpeed', label: 'Speed in kms', type: 'numeric' }
  ];

  // Function to get comparison indicator
  const getComparisonIndicator = (value, parameter, cars) => {
    if (cars.length < 2) return null;
    
    const values = cars.map(car => {
      const carValue = car[parameter.key];
      
      // Handle null/undefined values
      if (carValue === null || carValue === undefined) return 0;
      
      if (parameter.type === 'price') {
        // Extract numeric value from price strings like "₹2,85,000"
        const stringValue = String(carValue);
        return parseFloat(stringValue.replace(/[₹,\s]/g, '')) || 0;
      } else if (parameter.type === 'numeric') {
        // Extract numeric value from strings like "15,000 km"
        const stringValue = String(carValue);
        return parseFloat(stringValue.replace(/[,\s]/g, '')) || 0;
      }
      return carValue;
    });

    // Handle null/undefined current value
    if (value === null || value === undefined) return null;
    
    const currentValue = parameter.type === 'price' 
      ? parseFloat(String(value).replace(/[₹,\s]/g, '')) || 0
      : parseFloat(String(value).replace(/[,\s]/g, '')) || 0;

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    if (currentValue === maxValue && maxValue !== minValue) {
      return <span className="comparison-indicator better">↑</span>;
    }
    return null;
  };

  useEffect(() => {
    if (open && selectedCars.length > 0) {
      setComparisonData(selectedCars);
      setLoading(false);
    } else if (open && selectedCars.length === 0) {
      setLoading(false);
    }
  }, [open, selectedCars]);

  return (
    <>
      <div 
        className={`comparison-results-overlay ${open ? 'active' : ''}`} 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 400,
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'all 0.3s ease'
        }}
      ></div>
      <div 
        className={`comparison-results-popup ${open ? 'active' : ''}`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '1000px',
          width: '95vw',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          zIndex: 501,
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="comparison-results-header">
          <button className="comparison-back-btn" onClick={onBack} type="button">
            <i className="fas fa-arrow-left"></i>
            Back
          </button>
          <h3>Vehicle Comparison</h3>
          <button className="comparison-results-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="comparison-table-container">
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading comparison data...</p>
            </div>
          ) : selectedCars.length < 2 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
              Please select at least 2 cars to compare (Currently: {selectedCars.length} cars)
            </p>
          ) : (
            <div className="comparison-content">
              {/* Comparison table */}
              <table className="comparison-table">
                <tbody>
                  {/* Vehicle info row */}
                  <tr className="comparison-row vehicle-info-row">
                    <td className="parameter-label">Vehicle</td>
                    {comparisonData.map((car) => (
                      <td key={car.id} className="parameter-value vehicle-info-cell">
                        <div className="vehicle-info">
                          <div className="vehicle-year">{car.year}</div>
                          <div className="vehicle-oem">{car.brand}</div>
                          <div className="vehicle-model">{car.model}</div>
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  {parameters.map((param) => (
                    <tr key={param.key} className="comparison-row">
                      <td className="parameter-label">{param.label}</td>
                      {comparisonData.map((car) => {
                        const value = car[param.key] || 'N/A';
                        return (
                          <td key={car.id} className="parameter-value">
                            <div className="value-container">
                              <span className="value-text">{value}</span>
                              {getComparisonIndicator(value, param, comparisonData)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ComparisonResultsPopup;

