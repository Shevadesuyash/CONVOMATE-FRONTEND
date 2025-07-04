import React from "react";

import "../../assets/css/style.css";
const ContactSection = () => {
  return (
    <section id="contact">
      <div className="container11">
        <div className="section-header">
          <h2>Contact Us</h2>
        </div>
        <div className="row contact-info">
          <div className="col-md-4">
            <div className="contact-address">
              <i className="ion-ios-location-outline"></i>
              <h3>Address</h3>
              <address>
                <b>NCER, Talegaon Dabhade</b>
              </address>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-phone">
              <i className="ion-ios-telephone-outline"></i>
              <h3>Phone Number</h3>
              <a href="tel:+155895548855">9359782454</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-email">
              <i className="ion-ios-email-outline"></i>
              <h3>Email</h3>
              <a href="mailto:info@example.com">convomate@star.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
