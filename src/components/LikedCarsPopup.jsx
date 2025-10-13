import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';

const LikedCarsPopup = ({ open, onClose }) => {
  const { likedCars, removeFromLiked } = useGlobal();
  const navigate = useNavigate();

  // Placeholder for liked cars data
  const likedCarsData = []; // Will be implemented when we have more data

  const handleCarClick = (carId) => {
    navigate(`/vehicle/${carId}`);
    onClose();
  };

  return (
    <>
      <div className={`liked-cars-overlay ${open ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`liked-cars-popup ${open ? 'active' : ''}`}>
        <div className="liked-cars-header">
          <h3>Cars You Liked</h3>
          <button className="liked-cars-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="liked-cars-container">
          {likedCarsData.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
              No cars liked yet
            </p>
          ) : (
            likedCarsData.map((car) => (
              <div key={car.id} className="car-widget" onClick={() => handleCarClick(car.id)}>
                <div className="car-image-container">
                  <img src={car.image} alt={car.title} className="car-image" />
                  <div className="car-actions">
                    <button 
                      className="liked-car-heart-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromLiked(car.id);
                      }}
                      type="button"
                    >
                      <i className="fas fa-heart"></i>
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
      </div>
    </>
  );
};

export default LikedCarsPopup;

