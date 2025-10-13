import React from 'react';
import { useGlobal } from '../contexts/GlobalContext';

const ComparisonResultsPopup = ({ open, onClose }) => {
  const { comparedCars } = useGlobal();
  
  // Placeholder for compared cars data
  const selectedCars = []; // Will be implemented when we have more data

  const parameters = [
    { key: 'price', label: 'Price' },
    { key: 'owners', label: 'No. of Owners' },
    { key: 'kilometers', label: 'Kilometers Driven' },
    { key: 'year', label: 'Age of Car' },
    { key: 'registrationYear', label: 'Registration Date' },
    { key: 'location', label: 'Location' }
  ];

  return (
    <>
      <div className={`comparison-results-overlay ${open ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`comparison-results-popup ${open ? 'active' : ''}`}>
        <div className="comparison-results-header">
          <h3>Vehicle Comparison</h3>
          <button className="comparison-results-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="comparison-table-container">
          {selectedCars.length < 2 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
              Please select at least 2 cars to compare
            </p>
          ) : (
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Parameters</th>
                  {selectedCars.map((car) => (
                    <th key={car.id}>{car.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parameters.map((param) => (
                  <tr key={param.key}>
                    <td className="parameter-label">{param.label}</td>
                    {selectedCars.map((car) => (
                      <td key={car.id} className="parameter-value">
                        {car[param.key] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ComparisonResultsPopup;

