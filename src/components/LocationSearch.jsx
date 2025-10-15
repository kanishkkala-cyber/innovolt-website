import React, { useState, useRef, useEffect } from 'react';

const LocationSearch = ({ 
  availableLocations, 
  selectedLocations, 
  onLocationChange, 
  placeholder = "Search for cities..." 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Filter locations based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLocations([]);
    } else {
      const filtered = availableLocations.filter(location =>
        location.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchTerm, availableLocations]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(value.trim() !== '');
  };

  // Handle location checkbox toggle
  const handleLocationToggle = (location) => {
    const isSelected = selectedLocations.includes(location);
    let newSelectedLocations;
    
    if (isSelected) {
      // Remove location
      newSelectedLocations = selectedLocations.filter(loc => loc !== location);
    } else {
      // Add location
      newSelectedLocations = [...selectedLocations, location];
    }
    
    onLocationChange(newSelectedLocations);
  };

  // Handle tag removal
  const handleTagRemove = (locationToRemove) => {
    const newSelectedLocations = selectedLocations.filter(loc => loc !== locationToRemove);
    onLocationChange(newSelectedLocations);
  };

  // Handle clear all
  const handleClearAll = () => {
    onLocationChange([]);
    setSearchTerm('');
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="location-search-container" ref={searchRef}>
      {/* Search Input */}
      <div className="location-search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="location-search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(searchTerm.trim() !== '')}
        />
        <i className="fas fa-search location-search-icon"></i>
      </div>

      {/* Selected Location Tags */}
      {selectedLocations.length > 0 && (
        <div className="selected-locations-tags">
          <div className="tags-header">
            <span className="tags-label">Selected Cities:</span>
            <button 
              className="clear-all-btn"
              onClick={handleClearAll}
              type="button"
            >
              Clear All
            </button>
          </div>
          <div className="tags-container">
            {selectedLocations.map((location) => (
              <div key={location} className="location-tag">
                <span className="tag-text">{location}</span>
                <button 
                  className="tag-remove-btn"
                  onClick={() => handleTagRemove(location)}
                  type="button"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && searchTerm.trim() !== '' && (
        <div className="location-suggestions-wrapper">
          {filteredLocations.length > 0 ? (
            <div className="location-suggestions">
              {filteredLocations.map((location) => {
                const isSelected = selectedLocations.includes(location);
                return (
                  <div
                    key={location}
                    className="location-suggestion"
                    onClick={() => handleLocationToggle(location)}
                  >
                    <div className="suggestion-checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // Handled by parent div click
                        className="checkbox-input"
                      />
                    </div>
                    <span className="suggestion-text">{location}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="location-no-results">
              <span>No cities found for "{searchTerm}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
