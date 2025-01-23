import React from 'react';

const TopBar = () => {
  return (
    <section className="d-none d-lg-block" id="topbar">
      <div className="container clearfix">
        <div className="contact-info float-left">
          <i className="fa fa-envelope-o"></i> <a href="mailto:convomate@star.com">convomate@star.com</a>
          <i className="fa fa-phone"></i> +1 5589 55488 55
        </div>
        <div className="social-links float-right">
          <a className="twitter" href="#"><i className="fa fa-twitter"></i></a>
          <a className="facebook" href="#"><i className="fa fa-facebook"></i></a>
          <a className="instagram" href="#"><i className="fa fa-instagram"></i></a>
          <a className="google-plus" href="#"><i className="fa fa-google-plus"></i></a>
          <a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
