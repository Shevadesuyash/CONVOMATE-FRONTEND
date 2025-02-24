import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="pull-left" id="logo">
          <h1><Link to="/">Convo<span>Mate</span></Link></h1>
        </div>
        <nav id="nav-menu-container">
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li className="menu-has-children">
              <Link to="/models">Models</Link>
              <ul>
                <li><Link to="/models/voice-convomate">Voice Convomate</Link></li>
                <li><Link to="/models/text-to-voice">Text to Voice</Link></li>
                <li><Link to="/models/paragraph-checker">Paragraph Checker</Link></li>
                <li><Link to="/models/learning-languages">Learning Basics of Languages</Link></li>
              </ul>
            </li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;