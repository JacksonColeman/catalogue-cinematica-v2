// components/Header.js
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import your stylesheet
import LoginModal from "../LoginModal/LoginModal";
import { FaSearch } from "react-icons/fa";

const Header = ({ isLoggedIn, userName }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <header className="header">
      {/* <Link className="home-link" to="/">
        Catalogue Cinematica
      </Link> */}
      <a className="home-link" href="/">
        <p className="home-link-text">Catalogue</p>
        <p className="home-link-text">Cinematica</p>
      </a>
      <nav className="header-nav">
        <ul className="header-links">
          <li>
            <FaSearch className="search-icon" />
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/account">Account</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="#" onClick={() => setOpenModal(true)}>
                  Log In
                </a>
                <LoginModal
                  open={openModal}
                  handleCloseModal={() => setOpenModal(false)}
                />
              </li>
            </>
          )}
          <li>
            <Link to="/films">Discover</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/lists">Lists</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
