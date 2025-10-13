import React from 'react';
import { useGlobal } from '../contexts/GlobalContext';

const LocationPopup = ({ open, onClose }) => {
  const { setSelectedCity } = useGlobal();

  const cities = [
    { name: 'Bangalore', icon: 'fa-building' },
    { name: 'Delhi', icon: 'fa-landmark' },
    { name: 'Pune', icon: 'fa-city' },
    { name: 'Hyderabad', icon: 'fa-university' },
    { name: 'Lucknow', icon: 'fa-mosque' },
    { name: 'Kanpur', icon: 'fa-industry' },
    { name: 'Chennai', icon: 'fa-water' }
  ];

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    onClose();
  };

  return (
    <>
      <div className={`location-popup-overlay ${open ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`location-popup ${open ? 'active' : ''}`}>
        <div className="location-popup-header">
          <h3>Select a city</h3>
          <button className="popup-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="cities-grid">
          {cities.map((city) => (
            <div key={city.name} className="city-item" onClick={() => handleCitySelect(city.name)}>
              <div className="city-icon">
                <i className={`fas ${city.icon}`}></i>
              </div>
              <span className="city-name">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LocationPopup;

