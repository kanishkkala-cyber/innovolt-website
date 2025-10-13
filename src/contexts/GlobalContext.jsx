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
  const [likedCars, setLikedCars] = useState(() => {
    const saved = localStorage.getItem('likedCars');
    return saved ? JSON.parse(saved) : [];
  });

  const [comparedCars, setComparedCars] = useState(() => {
    const saved = localStorage.getItem('comparedCars');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'Bangalore';
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('likedCars', JSON.stringify(likedCars));
  }, [likedCars]);

  useEffect(() => {
    localStorage.setItem('comparedCars', JSON.stringify(comparedCars));
  }, [comparedCars]);

  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedCity]);

  const toggleLike = (carId) => {
    setLikedCars((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      } else {
        return [...prev, carId];
      }
    });
  };

  const toggleCompare = (carId) => {
    setComparedCars((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      } else {
        if (prev.length >= 3) {
          alert('You can compare maximum 3 cars');
          return prev;
        }
        return [...prev, carId];
      }
    });
  };

  const removeFromLiked = (carId) => {
    setLikedCars((prev) => prev.filter((id) => id !== carId));
  };

  const removeFromCompare = (carId) => {
    setComparedCars((prev) => prev.filter((id) => id !== carId));
  };

  const isLiked = (carId) => likedCars.includes(carId);
  const isCompared = (carId) => comparedCars.includes(carId);

  const value = {
    likedCars,
    comparedCars,
    selectedCity,
    setSelectedCity,
    toggleLike,
    toggleCompare,
    removeFromLiked,
    removeFromCompare,
    isLiked,
    isCompared,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

