import React from 'react';
import { Link } from 'react-router-dom';

const SlidingMenu = ({ open, onClose }) => {
  return (
    <>
      <div className={`menu-overlay ${open ? 'active' : ''}`} onClick={onClose}></div>
      <nav className={`sliding-menu ${open ? 'active' : ''}`}>
        <div className="menu-header">
          <Link to="/" className="menu-logo" style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={onClose}>
            <svg width="160" height="50" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="2" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#EF4444" fontStyle="italic" letterSpacing="-0.5px">innovolt</text>
            </svg>
          </Link>
          <button className="menu-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="menu-items">
          <li><Link to="/" onClick={onClose}><i className="fas fa-home"></i> Home</Link></li>
          <li><Link to="/catalogue" onClick={onClose}><i className="fas fa-car"></i> Buy Car</Link></li>
          <li><a href="#how-it-works" onClick={onClose}><i className="fas fa-info-circle"></i> How does it work</a></li>
          <li><Link to="/about" onClick={onClose}><i className="fas fa-building"></i> About Us</Link></li>
          <li><Link to="/contact" onClick={onClose}><i className="fas fa-envelope"></i> Contact us</Link></li>
        </ul>
        
        {/* Menu Footer Logo */}
        <div className="menu-footer">
          <Link to="/" className="menu-footer-logo" style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={onClose}>
            <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="50" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#EF4444" fontStyle="italic" letterSpacing="-1px">innovolt</text>
              <text x="10" y="70" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="normal" fill="#94a3b8">India's No.1 Used 3W EV Marketplace</text>
            </svg>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default SlidingMenu;

