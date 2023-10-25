// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, userName }) => {
  return (
    <div>
      <nav>
        <div>
          <div>
            <Link to="/">Catalogue Cinematica</Link>
          </div>
          {isLoggedIn ? (
            <>
              <div>
                <Link to="/account">Account: {userName}</Link>
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
        </div>
      </nav>
    </div>
  );
};

export default Header;
