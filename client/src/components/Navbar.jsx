import React from 'react';
import './Navbar.css'; // Make sure to create a corresponding CSS file

const Navbar = () => {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="navbar-location">
          <i className="location-icon"></i> 
          <span>Cracow</span>
        </div>
        <div className="navbar-links">
          <a href="/store">Store</a>
          <a href="/deals">Deals</a>
          <a href="/about-us">About Us</a>
          <a href="/delivery">Delivery</a>
        </div>
        <div className="navbar-contact">
          <i className="phone-icon"></i>
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
            <i className="search-icon">🔍</i> 
          </button>
        </div>
        <div className="navbar-icons">
          <i className="user-icon"></i> 
          <i className="heart-icon"></i> 
          <i className="cart-icon"></i> 
        </div>
      </div>
    </header>
  );
};
// #TODO: Add icons
export default Navbar;
