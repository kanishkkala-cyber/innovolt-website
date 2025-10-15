import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
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
      const response = await apiService.submitContact(formData);
      setSubmitStatus({ type: 'success', message: response.message });
          setFormData({ name: '', phone: '', city: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to submit form. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-main">
      {/* Contact Support Section */}
      <section className="contact-support-section">
        <div className="container">
          <div className="contact-content">
            {/* Left Section - Customer Support Info */}
            <div className="support-info">
              <h1 className="support-heading">Customer Support</h1>
              <p className="email-text">
                Email: <span className="email-address">innovoltsales@turno.club</span>
              </p>

              <h3 className="social-heading">Follow Us</h3>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/turno.club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/turnoclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/turnoclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon linkedin"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCZDxqBUyszLlgIGMnc1pjMA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon youtube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>

              <h3 className="office-heading">Corporate Office</h3>
              <p className="office-address">
                Industrial Plot Bearing No 7-A1, 3rd Cross Rd, Devasandra Industrial Estate,
                Krishnarajapura, Near VR Mall, Bengaluru, Karnataka - 560048
              </p>
              <button
                className="directions-btn"
                onClick={() =>
                  window.open(
                    'https://maps.google.com/maps?q=Industrial+Plot+Bearing+No+7-A1,+3rd+Cross+Rd,+Devasandra+Industrial+Estate,+Krishnarajapura,+Near+VR+Mall,+Bengaluru,+Karnataka+560048',
                    '_blank'
                  )
                }
              >
                Get Directions
              </button>
            </div>

            {/* Right Section - Get in Touch Form */}
            <div className="contact-form-section">
              <div className="form-card">
                <h2 className="form-heading">Get in touch</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  {submitStatus && (
                    <div className={`submit-status ${submitStatus.type}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      placeholder="Enter City Location"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      name="message"
                      className="form-input form-textarea"
                      placeholder="Enter Message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  <p className="legal-text">
                    By contacting us you agree to the{' '}
                    <Link to="/terms" className="legal-link">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="legal-link">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

