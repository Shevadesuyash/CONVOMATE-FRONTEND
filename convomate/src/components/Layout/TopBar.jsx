import React from "react";
import "font-awesome/css/font-awesome.min.css";

const TopBar = () => {
  return (
    <section id="topbar">
      <div className="container">
        <div className="contact-info">
          <i className="fa fa-envelope-o"></i>
          <a href="mailto:contact@example.com">convomate@star.com</a>
          <i className="fa fa-phone"></i> +1 5589 55488 55
        </div>
        <div className="social-links">

          <a href="https://www.facebook.com/" className="facebook"><i className="fa fa-facebook"></i></a>
          <a href="https://www.instagram.com/accounts/login/?hl=en" className="instagram"><i className="fa fa-instagram"></i></a>
          <a href="https://g.co/kgs/KxRpUCz" className="google-plus"><i className="fa fa-google-plus"></i></a>
          <a href="https://in.linkedin.com/" className="linkedin"><i className="fa fa-linkedin"></i></a>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
