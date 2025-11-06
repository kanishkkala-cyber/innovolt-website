import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CarWidget from '../components/CarWidget';
import apiService from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [citiesSlide, setCitiesSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch featured cars from backend
  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        setLoading(true);
        const cars = await apiService.getCars();
        setFeaturedCars(cars.slice(0, 12)); // Get first 12 cars
      } catch (err) {
        // Fallback to empty array if API fails
        setFeaturedCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  // Handle hash navigation to scroll to "How It Works" section
  useEffect(() => {
    if (window.location.hash === '#how-it-works') {
      setTimeout(() => {
        const element = document.getElementById('how-it-works');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);
  const [slidesToShow, setSlidesToShow] = useState(3); // Default for desktop
  const [slideWidth, setSlideWidth] = useState(320); // Default slide width
  
  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSlidesToShow(1); // Show 1 car on mobile
        setSlideWidth(280); // Mobile slide width
      } else if (window.innerWidth <= 768) {
        setSlidesToShow(2); // Show 2 cars on tablet
        setSlideWidth(300); // Tablet slide width
      } else {
        setSlidesToShow(3); // Show 3 cars on desktop
        setSlideWidth(320); // Desktop slide width
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, featuredCars.length - slidesToShow);

  const cities = [
    { 
      name: 'Bangalore', 
      image: 'https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg?sharp=10&vib=20&w=600&h=400'
    },
    { 
      name: 'Chennai', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Chennai_Central.jpg/330px-Chennai_Central.jpg'
    },
    { 
      name: 'Hyderabad', 
      image: 'https://cdn.britannica.com/77/22877-050-9EFB35D4/Charminar-city-Hyderabad-India-Telangana.jpg'
    },
    { 
      name: 'Pune', 
      image: 'https://timesofindia.indiatimes.com/photo/40367788.cms'
    },
    { 
      name: 'Agra', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Taj_Mahal%2C_Agra%2C_India.jpg'
    },
    { 
      name: 'Delhi', 
      image: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg'
    },
    { 
      name: 'Kanpur', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/J.K._Temple_%28cropped%29.jpg'
    },
    { 
      name: 'Lucknow', 
      image: 'https://www.uptourism.gov.in/images/rumigate.jpg'
    }
  ];

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleCitiesPrev = () => {
    if (citiesSlide > 0) {
      setCitiesSlide(citiesSlide - 1);
    }
  };

  const handleCitiesNext = () => {
    if (citiesSlide < cities.length - 5) {
      setCitiesSlide(citiesSlide + 1);
    }
  };

  // FAQ accordion
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "What kind of vehicles does Innovolt sell?",
      answer: "Innovolt specializes in selling used electric three-wheelers that are ideal for commercial use."
    },
    {
      question: "Where can I view the available vehicle listings?",
      answer: "You can view all available vehicle listings on Innovolt's official website. Also you can get vehicle information by calling us on 080-47484881."
    },
    {
      question: "Does Innovolt offer any after-sales support?",
      answer: "Customers can access after-sales support by calling the Innovolt helpline at 080-47484881, where EV experts are available to address any queries."
    },
    {
      question: "Can I test drive a vehicle before purchasing?",
      answer: "Innovolt offers test drives at home or at innovolt hub to ensure satisfaction before purchase."
    },
    {
      question: "Is the test drive free?",
      answer: "Yes, innovolt offers free test drives for all of its vehicles."
    },
    {
      question: "What are the benefits of buying a used electric three-wheeler from Innovolt?",
      answer: "• Lower cost compared to new vehicles\n• Rigorous 200-point inspection ensuring quality\n• Faster and quicker purchase process compared to buying a new vehicle\n• Premium servicing support"
    },
    {
      question: "Does Innovolt provide financing for used commercial vehicles?",
      answer: "No, Innovolt does not currently offer any financial services. However, you can obtain loans from external loan service providers."
    },
    {
      question: "What documents are required to purchase a vehicle?",
      answer: "The documentation process is simple; customers only need to submit their Aadhaar and PAN card."
    },
    {
      question: "How long does it take to process the document transfer?",
      answer: "The document transfer process is swift, typically taking 3-7 working days to complete."
    }
  ];

  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop banner image URL
  const desktopBannerUrl = "https://www.innovolt.in/_next/image?url=https%3A%2F%2Fassets.turnoclub.com%2Fdeveloper%2Foffer-turno-images%2FS3%2Finnovolt%2Fbanner_innovolt2.webp&w=1080&q=75";
  
  // Mobile banner image URL - same image as desktop
  const mobileBannerUrl = "https://www.innovolt.in/_next/image?url=https%3A%2F%2Fassets.turnoclub.com%2Fdeveloper%2Foffer-turno-images%2FS3%2Finnovolt%2Fbanner_innovolt2.webp&w=1080&q=75";

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="innovolt-banner-image">
            {/* Desktop Image */}
            <img 
              src={desktopBannerUrl}
              alt="Innovolt Banner" 
              className="banner-img banner-img-desktop" 
            />
            {/* Mobile Image */}
            <img 
              src={mobileBannerUrl}
              alt="Innovolt Banner" 
              className="banner-img banner-img-mobile" 
            />
          </div>
        </div>
      </section>

      {/* Car Widgets Section (Slider) */}
      <section className="car-widgets-section">
        <div className="container">
          <div className="car-widgets-header">
            <h2 className="car-widgets-heading">Featured Cars</h2>
            <Link to="/catalogue" className="view-catalogue-btn">
              <span>View Catalogue</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          
          <div className="car-slider-container">
            <button 
              className="slider-nav-btn slider-prev" 
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              type="button"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="car-slider-wrapper">
              <div 
                className="car-slider"
                style={{ transform: `translateX(-${currentSlide * slideWidth}px)` }}
              >
                {featuredCars.map((car) => (
                  <CarWidget key={car.id} car={car} />
                ))}
              </div>
            </div>
            
            <button 
              className="slider-nav-btn slider-next" 
              onClick={handleNextSlide}
              disabled={currentSlide >= maxSlide}
              type="button"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Innovolt Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="benefits-heading">Innovolt Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card featured">
              <div className="benefit-icon">
                <i className="fas fa-search-plus"></i>
                <div className="icon-badge">
                  <span className="badge-text">200+</span>
                </div>
              </div>
              <h3 className="benefit-title">200+ Points Quality Check</h3>
              <p className="benefit-description">Every vehicle undergoes a comprehensive inspection to ensure the highest quality standards.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-file-alt"></i>
                <div className="icon-badge">
                  <i className="fas fa-check"></i>
                </div>
              </div>
              <h3 className="benefit-title">Free Document Transfer</h3>
              <p className="benefit-description">We handle all the paperwork and documentation process for a hassle-free experience.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-star"></i>
                <div className="icon-badge">
                  <i className="fas fa-shield-alt"></i>
                </div>
              </div>
              <h3 className="benefit-title">3 Years Additional Battery Warranty</h3>
              <p className="benefit-description">Extended warranty coverage for your peace of mind and long-term reliability.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-truck"></i>
                <div className="icon-badge">
                  <i className="fas fa-percentage"></i>
                </div>
              </div>
              <h3 className="benefit-title">Premium Servicing Support</h3>
              <p className="benefit-description">Comprehensive after-sales service and maintenance support for your electric vehicle.</p>
            </div>
          </div>
          
          {/* View Cars Button */}
          <div className="view-cars-container">
            <Link to="/catalogue" className="view-cars-btn" type="button">
              <span>VIEW CARS</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <h2 className="how-it-works-heading">How does it work</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">
                <span>1</span>
              </div>
              <div className="step-content">
                <h3 className="step-title">Choose from the best 2nd hand 3 wheelers EV catalogue</h3>
                <p className="step-description">We have 100+ fully inspected cars in our inventory</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">
                <span>2</span>
              </div>
              <div className="step-content">
                <h3 className="step-title">Book a test drive easily by providing the necessary details</h3>
                <p className="step-description">Booking a test drive has never been this easy, all we need is some necessary information and we are good to go</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">
                <span>3</span>
              </div>
              <div className="step-content">
                <h3 className="step-title">Take a test drive at your home or at Innovolt Hub</h3>
                <p className="step-description">Experience the ride with a convenient test drive at your home or our Innovolt hub</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">
                <span>4</span>
              </div>
              <div className="step-content">
                <h3 className="step-title">Doorstep vehicle delivery if all goes well</h3>
                <p className="step-description">Enjoy a seamless purchase with delivery right to your doorstep for maximum convenience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Across India Section */}
      <section className="cars-india-section">
        <div className="container">
          <h2 className="cars-india-heading">Cars across PAN India</h2>
          <div className="cities-slider-container">
            <button 
              className="cities-slider-nav cities-slider-prev" 
              onClick={handleCitiesPrev}
              disabled={citiesSlide === 0}
              type="button"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="cities-slider-wrapper">
              <div 
                className="cities-slider"
                style={{ transform: `translateX(-${citiesSlide * 270}px)` }}
              >
                {cities.map((city) => (
                  <Link 
                    key={city.name} 
                    to={`/catalogue?location=${city.name}`}
                    className="city-card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="city-icon">
                      {city.image ? (
                        <img 
                          src={city.image} 
                          alt={city.name}
                          className="city-image"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            e.target.style.display = 'none';
                            const icon = e.target.parentElement.querySelector('.city-icon-fallback');
                            if (icon) icon.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`city-icon-fallback ${city.image ? '' : 'show'}`} style={{ display: city.image ? 'none' : 'flex' }}>
                        <i className={`fas ${city.icon || 'fa-map-marker-alt'}`}></i>
                      </div>
                    </div>
                    <h3 className="city-name">{city.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
            
            <button 
              className="cities-slider-nav cities-slider-next" 
              onClick={handleCitiesNext}
              disabled={citiesSlide >= cities.length - 5}
              type="button"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  type="button"
                >
                  <span>{faq.question}</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </button>
                <div className="faq-answer" style={{ maxHeight: activeFaq === index ? '500px' : '0' }}>
                  <p style={{ whiteSpace: 'pre-line' }}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

