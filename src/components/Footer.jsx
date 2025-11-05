import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand-section">
            <Link to="/" className="footer-logo" style={{ cursor: 'pointer', textDecoration: 'none' }}>
              <svg width="140" height="48" viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="2" y="32" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#EF4444" fontStyle="italic" letterSpacing="-0.5px">innovolt</text>
              </svg>
            </Link>
            <div className="powered-by-inline">
              <span className="separator">|</span>
              <span className="powered-by-text-inline">powered by <span className="turno-brand-inline">TURNO</span></span>
            </div>
          </div>

          {/* Footer Sections */}
          <div className="footer-sections">
            {/* Company Section */}
            <div className="footer-section">
              <h3 className="footer-heading">COMPANY</h3>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/refund">Refund Policy</Link></li>
              </ul>
            </div>

            {/* Electric Commercial Vehicles Section */}
            <div className="footer-section vehicles-section">
              <h3 className="footer-heading">ELECTRIC COMMERCIAL VEHICLES</h3>
              <div className="vehicles-flex-container">
                <div className="vehicles-column">
                  <ul className="footer-links">
                    <li><Link to="/catalogue?model=Piaggio">Piaggio</Link></li>
                    <li><Link to="/catalogue?model=Mahindra">Mahindra</Link></li>
                    <li><Link to="/catalogue?model=Etrio">Etrio</Link></li>
                  </ul>
                </div>
                <div className="vehicles-column">
                  <ul className="footer-links">
                    <li><Link to="/catalogue?model=Euler">Euler</Link></li>
                    <li><Link to="/catalogue?model=Montra">Montra</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buy Used 3 Wheelers Section */}
            <div className="footer-section cities-footer-section">
              <h3 className="footer-heading">BUY USED 3 WHEELERS EV IN</h3>
              <div className="cities-flex-container">
                <div className="cities-column">
                  <ul className="footer-links">
                    <li><Link to="/catalogue?location=Bangalore">Bangalore</Link></li>
                    <li><Link to="/catalogue?location=Hyderabad">Hyderabad</Link></li>
                    <li><Link to="/catalogue?location=Lucknow">Lucknow</Link></li>
                  </ul>
                </div>
                <div className="cities-column">
                  <ul className="footer-links">
                    <li><Link to="/catalogue?location=Delhi">Delhi</Link></li>
                    <li><Link to="/catalogue?location=Pune">Pune</Link></li>
                    <li><Link to="/catalogue?location=Kanpur">Kanpur</Link></li>
                  </ul>
                </div>
                <div className="cities-column">
                  <ul className="footer-links">
                    <li><Link to="/catalogue?location=Chennai">Chennai</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-contact">
            <div className="contact-layout">
              <div className="company-details">
                <p>Blubble Private Limited,</p>
                <p>Industrial Plot Bearing No 7-A1, 3rd Cross Rd, Devasandra Industrial Estate,</p>
                <p>Krishnarajapura, Near VR Mall, Bengaluru, Karnataka - 560048.</p>
              </div>
              <div className="contact-info">
                <button className="contact-btn phone-btn" type="button">
                  <i className="fas fa-phone"></i> 080-47484881
                </button>
                <button className="contact-btn email-btn" type="button">
                  <i className="fas fa-envelope"></i> innovoltsales@turno.club
                </button>
              </div>
            </div>
            <p className="copyright">© Blubble Pvt Ltd | All rights reserved | The Turno brand is owned by Blubble Private Limited</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

