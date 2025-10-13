import React, { useState } from 'react';
import apiService from '../services/api';

const CallPopup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await apiService.submitCallback(formData);
      setSubmitStatus({ type: 'success', message: response.message });
      
      // Reset form and close after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', phone: '', city: '', preferredTime: '', message: '' });
        setSubmitStatus(null);
        onClose();
      }, 3000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to submit request. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Simple Popup positioned below Call Us button */}
      <div 
        className={`call-popup-dropdown ${open ? 'active' : ''}`}
        style={{ display: open ? 'block' : 'none' }}
      >
        <div className="popup-header">
          <h4>Request a Call Back</h4>
          <button className="popup-close" onClick={onClose} type="button">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {!submitStatus ? (
          <div className="popup-content">
            <p className="popup-description">Fill in your details and we'll call you back within 30 minutes</p>
            <form onSubmit={handleSubmit} className="popup-form">
              {submitStatus && (
                <div className={`submit-status ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className="form-group">
                <label className="popup-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="popup-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="popup-label">Phone Number</label>
                <div className="phone-group">
                  <span className="phone-prefix">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    className="popup-input phone-input"
                    placeholder="Enter mobile number"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="popup-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="popup-input"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="popup-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'CALL ME'}
              </button>
            </form>
          </div>
        ) : (
          <div className="popup-success">
            <div className="success-icon">
              <i className={`fas ${submitStatus.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            </div>
            <h5>{submitStatus.type === 'success' ? 'Thank you!' : 'Error'}</h5>
            <p>{submitStatus.message}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CallPopup;

