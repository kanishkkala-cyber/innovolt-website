import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
import SlidingMenu from './SlidingMenu';
import LocationPopup from './LocationPopup';
import CallPopup from './CallPopup';
import ComparePopup from './ComparePopup';
import LikedCarsPopup from './LikedCarsPopup';
import ComparisonResultsPopup from './ComparisonResultsPopup';
import DynamicSearch from './DynamicSearch';

const Header = () => {
  const { likedCars, comparedCars, selectedCity } = useGlobal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationPopupOpen, setLocationPopupOpen] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [comparePopupOpen, setComparePopupOpen] = useState(false);
  const [likedPopupOpen, setLikedPopupOpen] = useState(false);
  const [comparisonResultsOpen, setComparisonResultsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [rotatingWord, setRotatingWord] = useState('model');

  const words = ['location', 'price', 'model', 'company'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setRotatingWord(words[wordIndex]);
  }, [wordIndex]);

  return (
    <>
      <header className="header">
        <div className="container">
          {/* Left Section - Menu and Logo */}
          <div className="header-left">
            {/* Mobile Menu Button */}
            <button className="menu-btn" onClick={() => setMenuOpen(true)} type="button">
              <i className="fas fa-bars"></i>
            </button>

            {/* Logo */}
            <Link to="/" className="logo" style={{ cursor: 'pointer', textDecoration: 'none' }}>
              <span className="logo-text">innovolt</span>
            </Link>
          </div>

          {/* Center Section - Search Bar */}
          <div className="header-center">
            <div className="search-bar">
              <div className="search-input-group">
                <i className="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  id="searchInput"
                  value={searchText}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchText(value);
                    setSearchDropdownOpen(value.trim() !== '');
                  }}
                  onFocus={(e) => {
                    e.target.nextSibling.style.opacity = '0';
                    if (e.target.value.trim() !== '') {
                      setSearchDropdownOpen(true);
                    }
                  }}
                  onBlur={(e) => {
                    if (!searchText) e.target.nextSibling.style.opacity = '1';
                    // Delay closing to allow clicking on suggestions
                    setTimeout(() => setSearchDropdownOpen(false), 200);
                  }}
                />
                <div className="search-placeholder" id="searchPlaceholder">
                  <span className="placeholder-text">Search by </span>
                  <span className="rotating-text" id="rotatingText">{rotatingWord}</span>
                </div>
              </div>
              {searchDropdownOpen && (
                <>
                  <DynamicSearch 
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onClose={() => setSearchDropdownOpen(false)}
                  />
                </>
              )}
            </div>
          </div>

          {/* Right Section - Location, Call Us, and Action Icons */}
          <div className="header-right">
            {/* Location Button */}
            <button className="location-btn" onClick={() => setLocationPopupOpen(true)} type="button">
              <i className="fas fa-map-marker-alt"></i>
              <span className="location-text">{selectedCity}</span>
              <i className="fas fa-chevron-down location-arrow"></i>
            </button>

            {/* Call Us Button with Popup */}
            <div className="call-btn-container" style={{ position: 'relative' }}>
              <button className="call-btn" onClick={() => setCallPopupOpen(!callPopupOpen)} type="button">
                <i className="fas fa-phone"></i>
                <span className="btn-text">Call us</span>
              </button>
              <CallPopup open={callPopupOpen} onClose={() => setCallPopupOpen(false)} />
            </div>

            {/* Action Icons */}
            <div className="action-icons">
              {/* Liked Cars Button */}
              <button className="action-icon-btn liked-btn" onClick={() => setLikedPopupOpen(true)} type="button">
                <i className="fas fa-heart"></i>
                <span className="action-count">{likedCars.length}</span>
              </button>

              {/* Compare Cars Button */}
              <button className="action-icon-btn compare-btn" onClick={() => setComparePopupOpen(true)} type="button">
                <i className="fas fa-balance-scale"></i>
                <span className="action-count">{comparedCars.length}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Popups */}
      <SlidingMenu 
        open={menuOpen} 
        onClose={() => setMenuOpen(false)}
      />
      <LocationPopup open={locationPopupOpen} onClose={() => setLocationPopupOpen(false)} />
      <ComparePopup 
        open={comparePopupOpen} 
        onClose={() => setComparePopupOpen(false)}
        onCompare={() => {
          setComparePopupOpen(false);
          setComparisonResultsOpen(true);
        }}
      />
      <LikedCarsPopup open={likedPopupOpen} onClose={() => setLikedPopupOpen(false)} />
      <ComparisonResultsPopup 
        open={comparisonResultsOpen} 
        onClose={() => setComparisonResultsOpen(false)} 
      />
    </>
  );
};

export default Header;

