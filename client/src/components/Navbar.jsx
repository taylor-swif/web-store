import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faSearch, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css'; // Make sure to create a corresponding CSS file

const Navbar = ({ onOpenCartModal }) => {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="navbar-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
          <span>Cracow</span>
        </div>
        <div className="navbar-links">
          <a href="/store">Store</a>
          <a href="/deals">Deals</a>
          <a href="/about-us">About Us</a>
          <a href="/delivery">Delivery</a>
        </div>
        <div className="navbar-contact">
          <FontAwesomeIcon icon={faPhone} className="phone-icon" />
          <span>+02 3 5 7 11 13</span>
        </div>
      </div>
      <div className="main-bar">
        <div className="navbar-logo">
            <img src="src/assets/wine-store-logo-crop.png" alt="Icon Description" width="50" height="50" />
          <span>WORLD OF WINE</span>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search for wines, regions, articles..." />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} className="search-icon" /> 
          </button>
        </div>
        <div className="navbar-icons">
          <FontAwesomeIcon icon={faHeart} className="heart-icon" />
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" onClick={onOpenCartModal} />
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
