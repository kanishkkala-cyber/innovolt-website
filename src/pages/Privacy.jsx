import React from 'react';

const Privacy = () => {
  return (
    <main className="privacy-main">
      <div className="container">
        <div className="privacy-content">
          <h1 className="privacy-heading">Privacy Policy</h1>

          <div className="privacy-text">
            <p>
              At TURNO AUTO SERVICES PRIVATE LIMITED, we value your privacy and are committed to
              protecting the personal information you share with us. This Privacy Policy outlines how
              we collect, use, disclose, and safeguard your data when you interact with our website,
              services, or platforms.
            </p>

            <p>
              When you voluntarily send us electronic mail / fillup the form, we will keep a record
              of this information so that we can respond to you. We only collect information from you
              when you register on our site or fill out a form. Also, when filling out a form on our
              site, you may be asked to enter your: name, e-mail address or phone number. You may,
              however, visit our site anonymously. In case you have submitted your personal
              information and contact details, we reserve the rights to Call, SMS, Email or WhatsApp
              about our products and offers, even if your number has DND activated on it.
            </p>

            <h2 className="section-heading">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="privacy-list">
              <li>
                <strong>Personal Information:</strong> Name, contact details (email, phone number),
                address, and payment details.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about your interactions with our website or
                app, such as IP address, browser type, and cookies.
              </li>
              <li>
                <strong>Vehicle Details:</strong> Information about your current vehicle for trade-in
                evaluations or service requests.
              </li>
            </ul>

            <h2 className="section-heading">How We Use Your Information</h2>
            <p>We use the information collected for:</p>
            <ul className="privacy-list">
              <li>Processing transactions and providing services.</li>
              <li>Personalizing your experience and improving our offerings.</li>
              <li>Communicating updates, offers, and promotions.</li>
              <li>Maintaining security and preventing fraud.</li>
            </ul>

            <h2 className="section-heading">Sharing Your Information</h2>
            <p>We do not sell your personal information. However, we may share your data with:</p>
            <ul className="privacy-list">
              <li>
                <strong>Service Providers:</strong> To facilitate payments, logistics, or other
                operations.
              </li>
              <li>
                <strong>Legal Authorities:</strong> If required by law or to protect our legal rights.
              </li>
              <li>
                <strong>Business Partners:</strong> In cases of collaboration or co-branded services,
                with your consent.
              </li>
            </ul>

            <h2 className="section-heading">Data Security</h2>
            <p>
              We implement industry-standard measures to protect your information from unauthorized
              access, alteration, or disclosure. However, no system is entirely secure, and we cannot
              guarantee absolute security.
            </p>

            <h2 className="section-heading">Cookies and Tracking</h2>
            <p>
              Our website uses cookies and similar technologies to enhance user experience and analyze
              website traffic. You can manage your cookie preferences through your browser settings.
            </p>

            <h2 className="section-heading">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="privacy-list">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt-out of marketing communications.</li>
              <li>Request information about data processing practices.</li>
            </ul>
            <p>
              To exercise these rights, contact us at{' '}
              <a href="mailto:innovoltsales@turno.club" className="contact-link">
                innovoltsales@turno.club
              </a>
            </p>

            <h2 className="section-heading">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with a revised effective date.
            </p>

            <div className="contact-section">
              <h2 className="contact-heading">Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy, please reach out to us at:</p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:innovoltsales@turno.club" className="contact-link">
                  innovoltsales@turno.club
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:8970233233" className="contact-link">
                  8970233233
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Privacy;

