import React from 'react';
import './TopBar.css'; // Import the CSS file for TopBar

const TopBar = () => {
  return (
    <section className="d-none d-lg-block" id="topbar">
      <div className="container clearfix">
        <div className="contact-info float-left">
          <i className="fa fa-envelope-o"></i>{' '}
          <a href="mailto:contact@example.com">convomate@star.com</a>
          <i className="fa fa-phone"></i> +1 5589 55488 55
        </div>
        <div className="social-links float-right">
          <a href="#" className="twitter">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" className="facebook">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="instagram">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="#" className="google-plus">
            <i className="fa fa-google-plus"></i>
          </a>
          <a href="#" className="linkedin">
            <i className="fa fa-linkedin"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TopBar;