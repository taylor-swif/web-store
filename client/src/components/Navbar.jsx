import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faSearch, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';
import { Link } from 'react-router-dom';

import UserModal from './modals/UserModal';
import CartModal from './modals/CartModal';
import { CartContext } from './modals/CartContext';


const Navbar = ({ }) => {
  const cartItems  = useContext(CartContext);
  const totalItemsInCart = cartItems.reduce((total, item) => {
    const itemQuantity = parseInt(item.quantity) || 0;
    return total + itemQuantity;
  }, 0);
  
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);

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
          <Link to={'/'}><span>WORLD OF WINE</span></Link>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search for wines, regions, articles..." />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} className="search-icon" /> 
          </button>
        </div>
        <div className="navbar-icons">
          <FontAwesomeIcon icon={faHeart} className="heart-icon" />

          <div className="cart-icon-container" onClick={() => setCartModalIsOpen(true)}>
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            {totalItemsInCart > 0 && totalItemsInCart < 100 && <div className="cart-badge">{totalItemsInCart}</div>}
            {totalItemsInCart >= 100 && <div className="cart-badge99">+99</div>}
          </div>
          {cartModalIsOpen && (
            <CartModal
              isOpen={cartModalIsOpen}
              onClose={() => setCartModalIsOpen(false)}
            />
          )}

          <div className="user-icon-container" onClick={() => {setUserModalIsOpen(true) }}>
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          </div>
          {userModalIsOpen && (
            <UserModal onClose={() => { setUserModalIsOpen(false) }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
