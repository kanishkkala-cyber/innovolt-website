import React from 'react';

const Refund = () => {
  return (
    <main className="refund-main">
      <div className="container">
        <div className="refund-content">
          <h1 className="refund-heading">Cancellation & Refund Policy</h1>
          <p className="last-updated">Last updated on 31-01-2025 17:03:40</p>

          <div className="refund-text">
            <p>
              TURNO AUTO SERVICES PRIVATE LIMITED believes in helping its customers as far as
              possible, and has therefore a liberal cancellation policy. Under this policy:
            </p>

            <p>
              Cancellations will be considered only if the request is made immediately after placing
              the order. However, the cancellation request may not be entertained if the orders have
              been communicated to the vendors/merchants and they have initiated the process of
              shipping them.
            </p>

            <p>
              In case of receipt of damaged or defective items please report the same to our Customer
              Service team. The request will, however, be entertained once the merchant has checked
              and determined the same at his own end. This should be reported within 30 Days of
              receipt of the products. In case you feel that the product received is not as shown on
              the site or as per your expectations, you must bring it to the notice of our customer
              service within 30 Days of receiving the product. The Customer Service Team after looking
              into your complaint will take an appropriate decision.
            </p>

            <p>
              In case of complaints regarding products that come with a warranty from manufacturers,
              please refer the issue to them. In case of any Refunds approved by the TURNO AUTO
              SERVICES PRIVATE LIMITED, it'll take 16–30 Days for the refund to be credited in the
              original mode of payment to the end customer.
            </p>

            <div className="contact-section">
              <h2 className="contact-heading">Contact Us</h2>
              <p>If you have any questions regarding this policy, please contact us at:</p>
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

export default Refund;

