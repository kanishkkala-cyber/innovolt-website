import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, value, onChange, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected value when prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleOptionClick = (optionValue) => {
    setSelectedValue(optionValue);
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div 
        className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <i className={`fas fa-chevron-down dropdown-arrow ${isOpen ? 'rotated' : ''}`}></i>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-option ${selectedValue === option.value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
