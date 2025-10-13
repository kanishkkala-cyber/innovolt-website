import React from 'react';

const About = () => {
  return (
    <main className="about-main">
      {/* Hero Cover Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <h1 className="about-hero-title">Your Destination for Affordable</h1>
            <h2 className="about-hero-subtitle">Second Hand Electric 3-Wheeler</h2>
            <p className="about-hero-tagline">
              <span className="highlight-text">NO.1 used 3W EV Market</span> Place in India.
            </p>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="about-content">
        <div className="container">
          <div className="content-wrapper">
            <h2 className="section-heading">About Us</h2>
            <p className="content-paragraph">
              Welcome to Innovolt, India's leading marketplace for used commercial electric vehicles (EVs). Our motive is to transform the transportation industry with eco-friendly and cost-effective mobility solutions that benefit both your business and the environment.
            </p>
            <p className="content-paragraph">
              What started as a simple idea to make electric mobility accessible has grown into a premier destination for a wide range of refurbished electric three-wheelers from top brands. Today, Innovolt proudly serves businesses across India, expanding our inventory to meet the rising demand for sustainable transportation options.
            </p>

            <h2 className="section-heading">Our Mission</h2>
            <p className="content-paragraph">
              We help businesses of every size grow by offering reliable, affordable, and high-quality used electric three-wheelers. Our carefully curated selection is designed to address diverse transportation needs, enabling businesses to adopt sustainable, cost-effective, and innovative solutions for their daily operations.
            </p>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="get-in-touch-section">
        <div className="content-wrapper">
          <h2 className="get-in-touch-heading">GET IN TOUCH WITH US</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="address-section">
                <h3 className="address-heading">Head Office Address:</h3>
                <p className="address-text">
                  Industrial Plot Bearing No 7-A1, 3rd Cross Rd, Devasandra Industrial Estate,<br />
                  Krishnarajapura, Near VR Mall, Bengaluru, Karnataka - 560048.
                </p>
              </div>
              <div className="support-section">
                <h3 className="support-heading">For help and support:</h3>
                <p className="support-text">
                  Email: <a href="mailto:innovoltsales@turno.club" className="contact-link">innovoltsales@turno.club</a><br />
                  Phone: <a href="tel:08047484881" className="contact-link">080-47484881</a>
                </p>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://maps.google.com/maps?q=TURNO+Head+Office,+Industrial+Plot+Bearing+No+7-A1,+3rd+Cross+Rd,+Devasandra+Industrial+Estate,+Krishnarajapura,+Near+VR+Mall,+Bengaluru,+Karnataka+560048&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Innovolt Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

