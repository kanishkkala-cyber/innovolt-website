import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
import SlidingMenu from './SlidingMenu';
import LocationPopup from './LocationPopup';
import CallPopup from './CallPopup';
import ComparePopup from './ComparePopup';
import ComparisonResultsPopup from './ComparisonResultsPopup';

const Header = () => {
  const { comparedCars, selectedCity } = useGlobal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationPopupOpen, setLocationPopupOpen] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [comparePopupOpen, setComparePopupOpen] = useState(false);
  const [comparisonResultsOpen, setComparisonResultsOpen] = useState(false);
  const [animateCount, setAnimateCount] = useState(false);

  // Animate compare count when it changes
  useEffect(() => {
    setAnimateCount(true);
    const timer = setTimeout(() => setAnimateCount(false), 600);
    return () => clearTimeout(timer);
  }, [comparedCars.length]);

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

          {/* Center Section - Navigation Menu */}
          <div className="header-center">
            <nav className="header-nav">
              <Link to="/catalogue" className="nav-link">Buy Car</Link>
              <Link 
                to="/#how-it-works" 
                className="nav-link"
                onClick={(e) => {
                  // If we're not on home page, navigate first
                  if (window.location.pathname !== '/') {
                    // Navigate to home with hash
                    window.location.href = '/#how-it-works';
                    e.preventDefault();
                  } else {
                    // If already on home, scroll to section
                    e.preventDefault();
                    setTimeout(() => {
                      const element = document.getElementById('how-it-works');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }
                }}
              >
                How Does It Work
              </Link>
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </nav>
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
              {/* Compare Cars Button */}
              <button className="action-icon-btn compare-btn" onClick={() => setComparePopupOpen(true)} type="button">
                <span className="compare-text">Compare Now</span>
                <span className={`action-count ${animateCount ? 'animate' : ''}`}>{comparedCars.length}</span>
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
      <ComparisonResultsPopup 
        open={comparisonResultsOpen} 
        onClose={() => setComparisonResultsOpen(false)}
        onBack={() => {
          setComparisonResultsOpen(false);
          setComparePopupOpen(true);
        }}
      />
    </>
  );
};

export default Header;

