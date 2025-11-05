import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';

const CarWidget = ({ car }) => {
  const navigate = useNavigate();
  const { toggleCompare, isCompared, comparedCars } = useGlobal();
  const [showLimitMessage, setShowLimitMessage] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCarClick = () => {
    navigate(`/vehicle/${car.id}`);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/vehicle/${car.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: car.title,
        text: `Check out this ${car.title} for ${car.price}`,
        url: url
      }).catch(() => {});
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    
    if (comparedCars.length >= 4 && !isCompared(car.id)) {
      setShowLimitMessage(true);
      setTimeout(() => setShowLimitMessage(false), 3000);
      return;
    }
    
    toggleCompare(car.id);
  };

  // Helper function to format price (price already formatted in Indian system by API)
  const formatPrice = (price) => {
    if (!price) return '';
    // Price is already formatted by API in Indian lakhs/crores format
    return price;
  };

  return (
    <div className="car-widget" onClick={handleCarClick} style={{ cursor: 'pointer' }}>
      {/* Limit message popup */}
      {showLimitMessage && (
        <div className="compare-limit-message">
          Cannot compare more than 4 vehicles at a time
        </div>
      )}
      
      <div className="car-image-container">
        <img 
          src={imageError ? '/placeholder-vehicle.svg' : car.image} 
          alt={car.title} 
          className="car-image"
          onError={() => {
            setImageError(true);
          }}
        />
        <div className="car-actions">
          <button 
            className="car-share-btn"
            onClick={handleShare}
            type="button"
            title="Share vehicle"
          >
            <i className="fas fa-share-alt"></i>
          </button>
          <button 
            className={`car-compare-btn ${isCompared(car.id) ? 'added' : ''}`}
            onClick={handleCompare}
            type="button"
            title="Compare vehicle"
          >
            <span className="compare-btn-text">Add to Compare</span>
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
        </div>
        <div className="car-pricing">
          <div className="emi-info">
            <span className="emi-text">EMI {car.emi}/m*</span>
          </div>
          <div className="price-info">
            <span className="current-price">{formatPrice(car.price)}</span>
          </div>
        </div>
        <div className="car-location">
          <i className="fas fa-map-marker-alt"></i>
          <span>{car.location}</span>
        </div>
      </div>
    </div>
  );
};

export default CarWidget;

