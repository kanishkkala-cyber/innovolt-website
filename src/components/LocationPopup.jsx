import React from 'react';
import { useGlobal } from '../contexts/GlobalContext';

const LocationPopup = ({ open, onClose }) => {
  const { setSelectedCity } = useGlobal();

  const cities = [
    { 
      name: 'Bangalore', 
      image: 'https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg?sharp=10&vib=20&w=600&h=400'
    },
    { 
      name: 'Delhi', 
      image: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg'
    },
    { 
      name: 'Pune', 
      image: 'https://timesofindia.indiatimes.com/photo/40367788.cms'
    },
    { 
      name: 'Hyderabad', 
      image: 'https://cdn.britannica.com/77/22877-050-9EFB35D4/Charminar-city-Hyderabad-India-Telangana.jpg'
    },
    { 
      name: 'Lucknow', 
      image: 'https://www.uptourism.gov.in/images/rumigate.jpg'
    },
    { 
      name: 'Kanpur', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/J.K._Temple_%28cropped%29.jpg'
    },
    { 
      name: 'Chennai', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Chennai_Central.jpg/330px-Chennai_Central.jpg'
    }
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
                <img 
                  src={city.image} 
                  alt={city.name}
                  className="city-image"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    e.target.style.display = 'none';
                    const icon = e.target.parentElement.querySelector('.city-icon-fallback');
                    if (icon) icon.style.display = 'flex';
                  }}
                />
                <div className="city-icon-fallback" style={{ display: 'none' }}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
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

