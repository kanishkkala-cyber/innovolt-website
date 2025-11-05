import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/api';
import CarWidget from '../components/CarWidget';

const Vehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [relatedVehicles, setRelatedVehicles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    terms: false
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        console.log('🖼️ [VEHICLE PAGE] ========================================');
        console.log('🖼️ [VEHICLE PAGE] Fetching vehicle with ID:', id);
        const car = await apiService.getCar(id);
        
        if (car) {
          console.log('✅ [VEHICLE PAGE] Vehicle data received:', {
            id: car.id,
            title: car.title,
            image: car.image,
            images: car.images,
            imageCount: car.images?.length || 0,
            hasMainImage: !!car.image,
            hasImageArray: !!car.images && car.images.length > 0
          });
          
          // Log each image URL with detailed info
          if (car.images && car.images.length > 0) {
            console.log('📸 [VEHICLE PAGE] Image URLs array (checking connectivity):');
            car.images.forEach((img, idx) => {
              const imageType = img 
                ? (img.startsWith('http') ? '🌐 External URL' 
                   : img.startsWith('/') ? '📁 Local path' 
                   : '❓ Unknown format') 
                : '❌ NULL/EMPTY';
              console.log(`  📸 [${idx}] ${imageType}: ${img || '(empty)'}`);
              
              // Test image connectivity by creating Image object
              if (img && img.trim() !== '') {
                const testImg = new Image();
                testImg.onload = () => {
                  console.log(`  ✅ [${idx}] Image connection test PASSED: ${img}`);
                  console.log(`     Image dimensions: ${testImg.width}x${testImg.height}`);
                  console.log(`     ✅ This URL should work in img tags`);
                };
                testImg.onerror = (error) => {
                  console.error(`  ❌ [${idx}] Image connection test FAILED: ${img}`);
                  console.error(`     Error: Authority invalid or CORS blocked`);
                  console.error(`     💡 Solution: Make sure file is set to "Anyone with the link can view"`);
                  console.error(`     💡 Alternative: Consider using a CDN or image hosting service`);
                };
                testImg.src = img;
              }
            });
          } else {
            console.warn('⚠️ [VEHICLE PAGE] No images array found or empty!');
          }
        } else {
          console.error('❌ [VEHICLE PAGE] Vehicle data is null/undefined');
        }
        console.log('🖼️ [VEHICLE PAGE] ========================================');
        
        setVehicle(car);
        
        // Fetch related vehicles after getting the current vehicle
        if (car) {
          fetchRelatedVehicles(car);
        }
      } catch (error) {
        console.error('❌ [VEHICLE PAGE] Error fetching vehicle:', error);
        setVehicle(null);
      }
    };
    
    if (id) {
      fetchVehicle();
    }
  }, [id]);

  const fetchRelatedVehicles = async (currentVehicle) => {
    try {
      // Get all vehicles first
      const allVehicles = await apiService.getCars();
      
      // Filter related vehicles based on brand and city
      const related = allVehicles.filter(car => {
        // Don't include the current vehicle
        if (car.id === currentVehicle.id) return false;
        
        // Extract brand from title (e.g., "Mahindra Treo Zor" -> "Mahindra")
        const currentBrand = currentVehicle.title.split(' ')[0].toLowerCase();
        const carBrand = car.title.split(' ')[0].toLowerCase();
        
        // Check if same brand or same city
        const sameBrand = currentBrand === carBrand;
        const sameCity = currentVehicle.location.toLowerCase() === car.location.toLowerCase();
        
        return sameBrand || sameCity;
      });
      
      // Limit to 8 vehicles and shuffle them
      const shuffled = related.sort(() => 0.5 - Math.random()).slice(0, 8);
      setRelatedVehicles(shuffled);
    } catch (error) {
      console.error('Error fetching related vehicles:', error);
      setRelatedVehicles([]);
    }
  };

  const handleImageClick = (index) => {
    const newImageUrl = vehicle?.images?.[index];
    console.log('🖼️ [VEHICLE PAGE] ========================================');
    console.log('🖼️ [VEHICLE PAGE] Image clicked - Changing to index:', index);
    console.log('🖼️ [VEHICLE PAGE] Previous image index:', currentImageIndex);
    console.log('🖼️ [VEHICLE PAGE] New image URL:', newImageUrl || '(empty)');
    console.log('🖼️ [VEHICLE PAGE] ========================================');
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
        vehicleId: id, // Use UUID as vehicle reference (from useParams)
        name: formData.name,
        phone: formData.phone, // Phone formatting handled in api.js
        city: formData.city
      };

      const response = await apiService.submitLead(leadData);
      setSubmitStatus({ type: 'success', message: 'Thank you for reaching out! Our team will get in touch with you shortly.' });
      
      // Reset form after showing success message
      setFormData({ name: '', phone: '', city: '', terms: false });
      
      // Keep the popup open to show the thank you message
      // User can close it manually or it will close when they click outside
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

  const scrollLeft = () => {
    const scrollContainer = document.querySelector('.vehicles-scroll');
    if (scrollContainer) {
      const scrollAmount = 320; // Width of one card + gap
      scrollContainer.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    const scrollContainer = document.querySelector('.vehicles-scroll');
    if (scrollContainer) {
      const scrollAmount = 320; // Width of one card + gap
      scrollContainer.scrollLeft += scrollAmount;
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
              onLoad={(e) => {
                console.log('✅ [VEHICLE PAGE] ========================================');
                console.log('✅ [VEHICLE PAGE] Main image LOADED successfully!');
                console.log('✅ [VEHICLE PAGE] Image Details:', {
                  index: currentImageIndex,
                  url: vehicle.images[currentImageIndex],
                  naturalWidth: e.target.naturalWidth,
                  naturalHeight: e.target.naturalHeight,
                  complete: e.target.complete,
                  loaded: true
                });
                console.log('✅ [VEHICLE PAGE] ========================================');
              }}
              onError={(e) => {
                console.error('❌ [VEHICLE PAGE] ========================================');
                console.error('❌ [VEHICLE PAGE] Main image FAILED to load!');
                console.error('❌ [VEHICLE PAGE] Error Details:', {
                  index: currentImageIndex,
                  expectedUrl: vehicle.images[currentImageIndex],
                  actualAttemptUrl: e.target.src,
                  error: 'Image load error - URL may be invalid or unreachable'
                });
                console.error('❌ [VEHICLE PAGE] ========================================');
              }}
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
                  onLoad={(e) => {
                    console.log(`✅ [VEHICLE PAGE] Thumbnail [${index}] LOADED - URL: ${image}`, {
                      index: index,
                      url: image,
                      naturalWidth: e.target.naturalWidth,
                      naturalHeight: e.target.naturalHeight,
                      isActive: index === currentImageIndex,
                      loaded: true
                    });
                  }}
                  onError={(e) => {
                    console.error(`❌ [VEHICLE PAGE] Thumbnail [${index}] FAILED to load - URL: ${image}`, {
                      index: index,
                      expectedUrl: image,
                      actualAttemptUrl: e.target.src,
                      error: 'Thumbnail load error - URL may be invalid or unreachable'
                    });
                  }}
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
                  <span>{vehicle.location}</span>
                </div>
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

      {/* Vehicle Overview Widget */}
      <div className="car-overview-widget">
        <div className="widget-header">
          <h3>Vehicle Overview</h3>
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
              <i className="fas fa-map-marker-alt"></i>
              <span className="overview-label">Location</span>
              <span className="overview-value">{vehicle.location}</span>
            </div>
            <div className="overview-item">
              <i className="fas fa-car"></i>
              <span className="overview-label">Model Type</span>
              <span className="overview-value">{vehicle.modelType || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Specifications Widget */}
      <div className="car-specs-widget">
        <div className="widget-header">
          <h3>Vehicle Specifications</h3>
        </div>
        <div className="specs-content">
          <div className="specs-row">
            {vehicle.loadCapacity && (
              <div className="spec-item">
                <i className="fas fa-weight-hanging"></i>
                <span className="spec-label">Load Capacity (kg)</span>
                <span className="spec-value">{vehicle.loadCapacity}</span>
              </div>
            )}
            {vehicle.batteryCapacity && (
              <div className="spec-item">
                <i className="fas fa-battery-full"></i>
                <span className="spec-label">Battery Capacity (kwt)</span>
                <span className="spec-value">{vehicle.batteryCapacity}</span>
              </div>
            )}
          </div>
          <div className="specs-row">
            {vehicle.chargingTime && (
              <div className="spec-item">
                <i className="fas fa-clock"></i>
                <span className="spec-label">Charging time (hours)</span>
                <span className="spec-value">{vehicle.chargingTime}</span>
              </div>
            )}
            {vehicle.topSpeed && (
              <div className="spec-item">
                <i className="fas fa-tachometer-alt"></i>
                <span className="spec-label">Top Speed (km/h)</span>
                <span className="spec-value">{vehicle.topSpeed}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More vehicles you can try section */}
      {relatedVehicles.length > 0 && (
        <div className="more-vehicles-section">
          <div className="container">
            <div className="section-header">
              <h2>More vehicles you can try</h2>
            </div>
            <div className="vehicles-scroll-container">
              <button className="scroll-btn scroll-left" onClick={scrollLeft}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="vehicles-scroll">
                {relatedVehicles.map((car) => (
                  <div key={car.id} className="vehicle-card-wrapper">
                    <CarWidget car={car} />
                  </div>
                ))}
              </div>
              <button className="scroll-btn scroll-right" onClick={scrollRight}>
                <i className="fas fa-chevron-right"></i>
              </button>
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
                  <div className="phone-input-container">
                    <span className="phone-prefix">+91</span>
                    <input
                      type="tel"
                      id="leadPhone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                      required
                    />
                  </div>
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

