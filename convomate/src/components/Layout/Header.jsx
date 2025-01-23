import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="pull-left" id="logo">
          <h1><a className="scrollto" href="/">Convo<span>Mate</span></a></h1>
        </div>

        <nav id="nav-menu-container">
          <ul className="nav-menu">
            <li className="menu-active"><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li className="menu-has-children"><Link to="#">Models</Link>
              <ul>
                <li><Link to="/models/voice-convomate">Voice Convomate</Link></li>
                <li><Link to="/models/paragraph-checker">Paragraph Checker</Link></li>
                <li><Link to="/models/learning-languages">Learning Languages</Link></li>
                <li><Link to="/models/text-to-voice">Text to Voice</Link></li>
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
