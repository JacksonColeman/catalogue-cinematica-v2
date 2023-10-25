// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your stylesheet

const Header = ({ isLoggedIn, userName }) => {
  return (
    <header>
      <nav className="header-nav">
        <div className="header-links">
          <div>
            <Link to="/">Catalogue Cinematica</Link>
          </div>
          {isLoggedIn ? (
            <>
              <div>
                <Link to="/account">Account</Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/signup">Sign Up</Link>
              </div>
              <div>
                <Link to="/login">Log In</Link>
              </div>
            </>
          )}
          <div>
            <Link to="/films">Films</Link>
          </div>
          <div>
            <Link to="/reviews">Reviews</Link>
          </div>
          <div>
            <Link to="/search">Lists</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
