import React from 'react';
import { useGlobal } from '../contexts/GlobalContext';
import { carData } from '../data/carData';

const ComparePopup = ({ open, onClose, onCompare }) => {
  const { comparedCars, removeFromCompare } = useGlobal();

  const selectedCars = carData.filter((car) => comparedCars.includes(car.id));

  return (
    <>
      <div className={`compare-popup-overlay ${open ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`compare-popup ${open ? 'active' : ''}`}>
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
              <div key={car.id} className="car-widget">
                <div className="car-image-container">
                  <img src={car.image} alt={car.title} className="car-image" />
                  <div className="car-actions">
                    <button 
                      className="compare-vehicle-remove" 
                      onClick={() => removeFromCompare(car.id)}
                      type="button"
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
          >
            <i className="fas fa-balance-scale"></i>
            Compare Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ComparePopup;

