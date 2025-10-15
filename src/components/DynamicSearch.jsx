import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const DynamicSearch = ({ searchText, setSearchText, onClose }) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const searchRef = useRef(null);


  // Fetch cars data for search
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await apiService.getCars();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars for search:', error);
        // Set empty array as fallback
        setCars([]);
      }
    };
    fetchCars();
  }, []);

  // Generate search suggestions with debouncing
  useEffect(() => {
    if (!searchText.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    // Don't search if cars data is not loaded yet
    if (cars.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Debounce search to avoid too many calls
    const timeoutId = setTimeout(() => {
      const results = generateSuggestions(searchText, cars);
      setSuggestions(results.slice(0, 7)); // Max 7 results
      setLoading(false);
    }, 500); // Increased delay to reduce calls

    return () => clearTimeout(timeoutId);
  }, [searchText, cars.length]); // Only depend on cars.length, not the full cars array

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const generateSuggestions = (query, carsData) => {
    const queryLower = query.toLowerCase().trim();
    const suggestions = [];

    // Check if query is a number or price-related
    const numericValue = parseNumericValue(query);
    if (numericValue !== null) {
      // Price-based suggestions
      const priceSuggestions = generatePriceSuggestions(numericValue, carsData);
      suggestions.push(...priceSuggestions);
    }

    // Check for location matches
    const locationSuggestions = generateLocationSuggestions(queryLower, carsData);
    suggestions.push(...locationSuggestions);

    // Check for model/brand matches
    const modelSuggestions = generateModelSuggestions(queryLower, carsData);
    suggestions.push(...modelSuggestions);

    // Check for specific vehicle matches
    const vehicleSuggestions = generateVehicleSuggestions(queryLower, carsData);
    suggestions.push(...vehicleSuggestions);

    // Remove duplicates and return
    return suggestions.filter((suggestion, index, self) => 
      index === self.findIndex(s => s.text === suggestion.text)
    );
  };

  const parseNumericValue = (query) => {
    // Handle various number formats
    const cleanQuery = query.replace(/[,\s]/g, '');
    
    // Check for "lakh" or "lac"
    if (cleanQuery.includes('lakh') || cleanQuery.includes('lac')) {
      const number = parseFloat(cleanQuery.replace(/[^\d.]/g, ''));
      return number ? number * 100000 : null;
    }
    
    // Check for "k" suffix
    if (cleanQuery.includes('k')) {
      const number = parseFloat(cleanQuery.replace(/[^\d.]/g, ''));
      return number ? number * 1000 : null;
    }
    
    // Direct number
    const number = parseFloat(cleanQuery);
    return isNaN(number) ? null : number;
  };

  const generatePriceSuggestions = (price, carsData) => {
    const suggestions = [];
    const tolerance = price * 0.2; // 20% tolerance
    
    const matchingCars = carsData.filter(car => {
      const carPrice = parseInt(car.price.replace(/[₹,]/g, '')) || 0;
      return Math.abs(carPrice - price) <= tolerance;
    });

    if (matchingCars.length > 0) {
      suggestions.push({
        type: 'price',
        text: `Cars around ₹${formatPrice(price)}`,
        subtitle: `${matchingCars.length} vehicles found`,
        action: () => navigateToCatalogueWithPrice(price),
        highlight: query => highlightText(`Cars around ₹${formatPrice(price)}`, query)
      });
    }

    return suggestions;
  };

  const generateLocationSuggestions = (query, carsData) => {
    const suggestions = [];
    const locations = [...new Set(carsData.map(car => car.location))];
    
    const matchingLocations = locations.filter(location => 
      location.toLowerCase().includes(query)
    );

    matchingLocations.forEach(location => {
      const carsInLocation = carsData.filter(car => car.location === location);
      suggestions.push({
        type: 'location',
        text: location,
        subtitle: `${carsInLocation.length} vehicles available`,
        action: () => navigateToCatalogueWithLocation(location),
        highlight: query => highlightText(location, query)
      });
    });

    return suggestions;
  };

  const generateModelSuggestions = (query, carsData) => {
    const suggestions = [];
    const models = [...new Set(carsData.map(car => car.brand))];
    
    const matchingModels = models.filter(model => 
      model.toLowerCase().includes(query)
    );

    matchingModels.forEach(model => {
      const carsOfModel = carsData.filter(car => car.brand === model);
      suggestions.push({
        type: 'model',
        text: `${model} vehicles`,
        subtitle: `${carsOfModel.length} vehicles available`,
        action: () => navigateToCatalogueWithModel(model),
        highlight: query => highlightText(`${model} vehicles`, query)
      });
    });

    return suggestions;
  };

  const generateVehicleSuggestions = (query, carsData) => {
    const suggestions = [];
    
    const matchingCars = carsData.filter(car => 
      car.title.toLowerCase().includes(query)
    );

    matchingCars.slice(0, 3).forEach(car => {
      suggestions.push({
        type: 'vehicle',
        text: car.title,
        subtitle: `${car.location} • ₹${car.price}`,
        action: () => navigateToVehicle(car.id),
        highlight: query => highlightText(car.title, query)
      });
    });

    return suggestions;
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="search-highlight">{part}</span>
      ) : part
    );
  };

  const formatPrice = (price) => {
    if (price >= 100000) {
      return `${(price / 100000).toFixed(1)}L`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toString();
  };

  const navigateToCatalogueWithPrice = (price) => {
    const minPrice = Math.max(price * 0.8, 0);
    const maxPrice = price * 1.2;
    navigate(`/catalogue?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    onClose();
  };

  const navigateToCatalogueWithLocation = (location) => {
    navigate(`/catalogue?location=${encodeURIComponent(location)}`);
    onClose();
  };

  const navigateToCatalogueWithModel = (model) => {
    navigate(`/catalogue?model=${encodeURIComponent(model)}`);
    onClose();
  };

  const navigateToVehicle = (vehicleId) => {
    navigate(`/vehicle/${vehicleId}`);
    onClose();
  };

  const handleSuggestionClick = (suggestion) => {
    suggestion.action();
  };



  if (!searchText.trim()) {
    return null;
  }

  return (
    <div className="dynamic-search-dropdown" ref={searchRef}>
      {loading ? (
        <div className="search-loading">
          <div className="search-spinner"></div>
          <span>Searching...</span>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="search-suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-icon">
                <i className={`fas ${
                  suggestion.type === 'vehicle' ? 'fa-car' :
                  suggestion.type === 'location' ? 'fa-map-marker-alt' :
                  suggestion.type === 'model' ? 'fa-tags' :
                  'fa-rupee-sign'
                }`}></i>
              </div>
              <div className="suggestion-content">
                <div className="suggestion-text">
                  {suggestion.highlight(searchText)}
                </div>
                <div className="suggestion-subtitle">
                  {suggestion.subtitle}
                </div>
              </div>
              <div className="suggestion-arrow">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="search-no-results">
          <div className="no-results-icon">
            <i className="fas fa-search"></i>
          </div>
          <div className="no-results-content">
            <div className="no-results-text">
              Sorry, we don't have what you're looking for
            </div>
            <div className="no-results-subtitle">
              Try searching for a model, location, or price range
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicSearch;
