import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider = ({ children }) => {
  const [comparedCars, setComparedCars] = useState(() => {
    const saved = localStorage.getItem('comparedCars');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'Bangalore';
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('comparedCars', JSON.stringify(comparedCars));
  }, [comparedCars]);

  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedCity]);

  const toggleCompare = (carId) => {
    setComparedCars((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      } else {
        if (prev.length >= 4) {
          return prev; // Don't add if limit reached
        }
        return [...prev, carId];
      }
    });
  };

  const removeFromCompare = (carId) => {
    setComparedCars((prev) => prev.filter((id) => id !== carId));
  };

  const isCompared = (carId) => comparedCars.includes(carId);

  const value = {
    comparedCars,
    selectedCity,
    setSelectedCity,
    toggleCompare,
    removeFromCompare,
    isCompared,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

