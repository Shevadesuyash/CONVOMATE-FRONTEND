import React from 'react';
import IntroSection from '../components/Sections/IntroSection';
import AboutSection from '../components/Sections/AboutSection';
import ServicesSection from '../components/Sections/ServicesSection';
import ContactSection from '../components/Sections/ContactSection';
import ReviewSection from '../components/Sections/ReviewSection';

const HomePage = () => {
  return (
    <div>
      <IntroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <ReviewSection />
    </div>
  );
};

export default HomePage;