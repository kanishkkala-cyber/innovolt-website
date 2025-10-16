import React, { useState, useEffect } from 'react';
import { useGlobal } from '../contexts/GlobalContext';
import { carData } from '../data/carData';
import apiService from '../services/api';

const ComparePopup = ({ open, onClose, onCompare }) => {
  const { comparedCars, removeFromCompare } = useGlobal();
  const [removingCarId, setRemovingCarId] = useState(null);
  const [allCars, setAllCars] = useState([]);

  // Fetch cars from the same source as the rest of the app
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await apiService.getCars();
        setAllCars(cars);
      } catch (error) {
        console.error('Error fetching cars for comparison:', error);
        // Fallback to local data
        setAllCars(carData);
      }
    };

    if (open) {
      fetchCars();
    }
  }, [open]);

  // Get actual car data for compared cars
  const selectedCars = allCars.filter(car => comparedCars.includes(car.id));
  

  const handleRemoveCar = (carId) => {
    setRemovingCarId(carId);
    // Add delay for smooth animation
    setTimeout(() => {
      removeFromCompare(carId);
      setRemovingCarId(null);
    }, 300);
  };

  return (
    <>
      <div 
        className={`compare-popup-overlay ${open ? 'active' : ''}`} 
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
        className={`compare-popup ${open ? 'active' : ''}`}
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
          zIndex: 401,
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="compare-popup-header">
          <h3>Compare Vehicles</h3>
          <button className="compare-popup-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="compare-vehicles-container">
          {selectedCars.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
              No cars selected for comparison
            </p>
          ) : (
            selectedCars.map((car) => (
              <div 
                key={car.id} 
                className={`car-widget ${removingCarId === car.id ? 'removing' : ''}`}
              >
                <div className="car-image-container">
                  <img src={car.image} alt={car.title} className="car-image" />
                  <div className="car-actions">
                    <button 
                      className="compare-vehicle-remove" 
                      onClick={() => handleRemoveCar(car.id)}
                      type="button"
                      title="Remove from comparison"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="car-badge">
                    <span className="badge-text">INNOVOLT</span>
                    <span className="badge-premium">PREMIUM</span>
                  </div>
                </div>
                <div className="car-details">
                  <h3 className="car-title">{car.title}</h3>
                  <div className="car-specs">
                    <span className="spec-tag">{car.kilometers}</span>
                    <span className="spec-tag">{car.owners}</span>
                  </div>
                  <div className="car-pricing">
                    <div className="emi-info">
                      <span className="emi-text">EMI {car.emi}/m*</span>
                    </div>
                    <div className="price-info">
                      <span className="current-price">{car.price}</span>
                    </div>
                  </div>
                  <div className="car-location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Innovolt Hub, {car.location}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="compare-actions">
          <button 
            className="compare-now-btn" 
            onClick={onCompare}
            disabled={selectedCars.length < 2}
            type="button"
            style={{
              padding: '12px 40px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Compare Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ComparePopup;

