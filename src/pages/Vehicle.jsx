import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/api';

const Vehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    message: '',
    terms: false
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const car = await apiService.getCar(id);
        setVehicle(car);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        setVehicle(null);
      }
    };
    
    if (id) {
      fetchVehicle();
    }
  }, [id]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const leadData = {
        vehicleRegNo: id, // Use registration number as vehicle reference
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        message: formData.message
      };

      const response = await apiService.submitLead(leadData);
      setSubmitStatus({ type: 'success', message: response.message });
      
      // Reset form and close after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', phone: '', city: '', message: '', terms: false });
        setSubmitStatus(null);
        setShowLeadPopup(false);
      }, 3000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to submit lead. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle?.title,
        text: `Check out this ${vehicle?.title} for ${vehicle?.price}`,
        url: window.location.href
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!vehicle) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Vehicle not found</h2>
        <Link to="/catalogue" style={{ color: '#EF4444', textDecoration: 'underline' }}>
          Back to Catalogue
        </Link>
      </div>
    );
  }

  // Similar cars (placeholder for now)
  const similarCars = []; // Will be implemented when we have more data

  return (
    <main className="vehicle-main">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-container">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">HOME</Link>
            <span className="separator">{'>'}</span>
            <Link to="/catalogue">USED 3W EVS IN {vehicle.location.toUpperCase()}</Link>
            <span className="separator">{'>'}</span>
            <span className="current">{vehicle.title}</span>
          </nav>
        </div>
      </div>

      <div className="vehicle-container">
        {/* Left Side - Image Carousel */}
        <div className="vehicle-images">
          <div className="main-image-container">
            <img 
              src={vehicle.images[currentImageIndex]} 
              alt={vehicle.title} 
              className="main-image" 
            />
          </div>
          <div className="thumbnail-container">
            <div className="thumbnails">
              {vehicle.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${vehicle.title} ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Vehicle Details */}
        <div className="vehicle-details">
          <div className="vehicle-widget">
            {/* Vehicle Header */}
            <div className="vehicle-header">
              <h1 className="vehicle-title">{vehicle.title}</h1>
              <div className="vehicle-specs">{vehicle.kilometers} · {vehicle.year}</div>
              <div className="vehicle-features">
                <div className="feature-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Innovolt Hub, {vehicle.location}</span>
                </div>
              </div>
              <div className="shortlisted-count">
                <i className="fas fa-heart"></i>
                <span>16 people shortlisted</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="pricing-section">
              <div className="price-label">On road price</div>
              <div className="price-main">{vehicle.price}</div>
              <div className="emi-label">EMI option</div>
              <div className="emi-current">EMI {vehicle.emi}/m</div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn-secondary" onClick={handleShare}>
                <i className="fas fa-share-alt"></i>
                Share
              </button>
              <button className="test-drive-btn" onClick={() => setShowLeadPopup(true)}>
                <span className="btn-main">FREE TEST DRIVE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Car Overview Widget */}
      <div className="car-overview-widget">
        <div className="widget-header">
          <h3>Car Overview</h3>
        </div>
        <div className="overview-content">
          <div className="overview-row">
            <div className="overview-item">
              <i className="fas fa-calendar-check"></i>
              <span className="overview-label">Reg. year</span>
              <span className="overview-value">{vehicle.registrationYear}</span>
            </div>
            <div className="overview-item">
              <i className="fas fa-tachometer-alt"></i>
              <span className="overview-label">KM driven</span>
              <span className="overview-value">{vehicle.kilometers}</span>
            </div>
          </div>
          <div className="overview-row">
            <div className="overview-item">
              <i className="fas fa-building"></i>
              <span className="overview-label">Reg number</span>
              <span className="overview-value">{vehicle.vehicleNumber}</span>
            </div>
            <div className="overview-item">
              <i className="fas fa-map-marker-alt"></i>
              <span className="overview-label">Location</span>
              <span className="overview-value">{vehicle.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Car Specifications Widget */}
      <div className="car-specs-widget">
        <div className="widget-header">
          <h3>Car Specifications</h3>
        </div>
        <div className="specs-content">
          <div className="specs-row">
            <div className="spec-item">
              <i className="fas fa-key"></i>
              <span className="spec-label">Spare Key</span>
              <span className="spec-value">{vehicle.spareKey}</span>
            </div>
            <div className="spec-item">
              <i className="fas fa-circle"></i>
              <span className="spec-label">Spare Wheel</span>
              <span className="spec-value">{vehicle.spareWheel}</span>
            </div>
            <div className="spec-item">
              <i className="fas fa-plug"></i>
              <span className="spec-label">Charger Available</span>
              <span className="spec-value">{vehicle.chargerAvailable}</span>
            </div>
          </div>
          <div className="specs-row">
            <div className="spec-item">
              <i className="fas fa-battery-half"></i>
              <span className="spec-label">Battery Condition</span>
              <span className="spec-value">{vehicle.batteryCondition}</span>
            </div>
            <div className="spec-item">
              <i className="fas fa-tools"></i>
              <span className="spec-label">Tool Kit Available</span>
              <span className="spec-value">{vehicle.toolKitAvailable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* More like this section */}
      {similarCars.length > 0 && (
        <div className="more-like-this-section">
          <div className="section-header">
            <h2>Still can't decide?</h2>
          </div>
          <div className="section-subtitle">
            <p>Explore cars similar to {vehicle.title}</p>
          </div>
          <div className="cars-slider-container">
            <div className="cars-slider">
              {similarCars.map((car) => (
                <Link 
                  to={`/vehicle/${car.id}`} 
                  key={car.id} 
                  className="car-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="car-image-container">
                    <img src={car.image} alt={car.title} className="car-image" />
                  </div>
                  <div className="car-details">
                    <h3 className="car-title">{car.title}</h3>
                    <div className="car-specs">
                      <span className="car-spec-tag">{car.kilometers}</span>
                      <span className="car-spec-tag">{car.owners}</span>
                    </div>
                    <div className="car-pricing">
                      <div className="car-emi">EMI {car.emi}/m*</div>
                      <div className="car-price">{car.price}</div>
                    </div>
                    <div className="car-location">
                      <i className="fas fa-map-marker-alt"></i>
                      Innovolt Hub, {car.location}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lead Capture Popup */}
      {showLeadPopup && (
        <>
          <div className="lead-popup-overlay active" onClick={() => setShowLeadPopup(false)}></div>
          <div className="lead-popup active">
            <div className="lead-popup-header">
              <h3>Book a Test Drive</h3>
              <button className="lead-popup-close" onClick={() => setShowLeadPopup(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            {!submitStatus ? (
              <form className="lead-form" onSubmit={handleFormSubmit}>
                {submitStatus && (
                  <div className={`submit-status ${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="leadName">Full Name*</label>
                  <input
                    type="text"
                    id="leadName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="leadPhone">Phone Number*</label>
                  <input
                    type="tel"
                    id="leadPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="leadCity">City*</label>
                  <input
                    type="text"
                    id="leadCity"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="leadMessage">Message (Optional)</label>
                  <textarea
                    id="leadMessage"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any specific questions or requirements..."
                  />
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="leadTerms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label htmlFor="leadTerms">
                    I authorize Blubble Pvt Ltd and/or its partners to call me. Please read our{' '}
                    <Link to="/privacy" target="_blank">Privacy Policy</Link> and{' '}
                    <Link to="/terms" target="_blank">Terms and Conditions</Link>
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="lead-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SUBMITTING...' : 'BOOK A TEST DRIVE'}
                </button>
              </form>
            ) : (
              <div className="thank-you-content">
                <div className="thank-you-icon">
                  <i className={`fas ${submitStatus.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                </div>
                <h3>{submitStatus.type === 'success' ? 'Thank You!' : 'Error'}</h3>
                <p>{submitStatus.message}</p>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Vehicle;

