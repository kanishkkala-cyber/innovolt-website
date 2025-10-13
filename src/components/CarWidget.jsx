import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';

const CarWidget = ({ car }) => {
  const navigate = useNavigate();
  const { toggleLike, toggleCompare, isLiked, isCompared } = useGlobal();

  const handleCarClick = () => {
    navigate(`/vehicle/${car.id}`);
  };

  return (
    <div className="car-widget" onClick={handleCarClick} style={{ cursor: 'pointer' }}>
      <div className="car-image-container">
        <img src={car.image} alt={car.title} className="car-image" />
        <div className="car-actions">
          <button 
            className={`car-heart-btn ${isLiked(car.id) ? 'liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(car.id);
            }}
            type="button"
          >
            <i className="far fa-heart"></i>
          </button>
          <button 
            className={`car-compare-btn ${isCompared(car.id) ? 'added' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(car.id);
            }}
            type="button"
          >
            <i className="fas fa-balance-scale"></i>
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
  );
};

export default CarWidget;

