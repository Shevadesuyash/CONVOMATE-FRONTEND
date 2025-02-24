import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  return (
    <div>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;