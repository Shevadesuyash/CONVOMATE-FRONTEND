import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const Header = () => {
  const { authenticated, logout, authKey } = useAuth(); // Use authentication state and logout function

  return (
    <header id="header" key={authKey}>
      <div className="container">
        <div className="pull-left" id="logo">
          <h1>
            <Link to="/" className="scrollto">
              Convo<span>Mate</span>
            </Link>
          </h1>
        </div>
        <nav id="nav-menu-container">
          <ul className="nav-menu">
            <li className="menu-active">
              <Link to="/">Home</Link>
            </li>
            {authenticated ? (
              <li id="logoutLink">
                <button onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              <li id="loginLink">
                <Link to="/login">Login</Link>
              </li>
            )}
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li className="menu-has-children">
              <Link to="/models">Models</Link>
              <ul>
                <li>
                  <Link to="/model/translator">Translator</Link>
                </li>
                <li>
                  <Link to="/models/paragraph-checker">Paragraph Checker</Link>
                </li>
                <li>
                  <Link to="/model/Chat-bot">/model/Chat-bot</Link>
                </li>
                <li>
                  <Link to="/model/grammar-check">/model/grammar-check</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;