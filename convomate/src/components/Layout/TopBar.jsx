import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../assets/css/style.css";
import "../../assets/lib/font-awesome/css/font-awesome.min.css";
import "../../assets/lib/animate/animate.min.css";
import "../../assets/lib/ionicons/css/ionicons.min.css";
import "../../assets/lib/owlcarousel/assets/owl.carousel.min.css";
import "../../assets/lib/magnific-popup/magnific-popup.css";
import "../Main.css";
const TopBar = () => {
  useEffect(() => {
    // Function to dynamically load scripts
    const loadScript = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    // Load external scripts dynamically
    loadScript("/assets/lib/easing/easing.min.js");
    loadScript("/assets/lib/owlcarousel/owl.carousel.min.js");
    loadScript("/assets/lib/magnific-popup/magnific-popup.min.js");

    return () => {
      // Cleanup: Remove dynamically added scripts when component unmounts
      document.body.querySelectorAll("script").forEach((script) => {
        if (
          script.src.includes("easing") ||
          script.src.includes("owl.carousel") ||
          script.src.includes("magnific-popup")
        ) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <section className="d-none d-lg-block" id="topbar">
      <div className="container clearfix">
        <div className="contact-info float-left">
          <i className="fa fa-envelope-o"></i>{" "}
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
