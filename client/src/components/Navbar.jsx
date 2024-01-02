import { useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSearch,
  faUser,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import "./styles/Navbar.css";
import { Link } from "react-router-dom";

import CartModal from "./modals/CartModal";
import { CartContext } from "../context/CartContext";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const cartItems = useContext(CartContext);
  const totalItemsInCart = cartItems.reduce((total, item) => {
    const itemQuantity = parseInt(item.quantity) || 0;
    return total + itemQuantity;
  }, 0);

  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);

  let { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="top-bar">
        <div className="navbar-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
          <span>Cracow</span>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/about-us">About Us</Link>
        </div>
        <div className="navbar-contact">
          {user ? (
            <div className="log-out-button" onClick={logoutUser}>
              <strong>Log out</strong>
            </div>
          ) : (
            <Link to={"/login"}>
              <strong>Sign in</strong>
            </Link>
          )}
        </div>
      </div>
      <div className="main-bar">
        <Link to={"/"}>
          <div className="navbar-logo">
            <img
              src="src/assets/wine-store-logo-crop.png"
              alt="Icon Description"
              width="50"
              height="50"
            />
            <span>WORLD OF WINE</span>
          </div>
        </Link>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for wines, regions, articles..."
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
        </div>
        <div className="navbar-icons">
          <FontAwesomeIcon icon={faHeart} className="heart-icon" />

          <div
            className="cart-icon-container"
            onClick={() => setCartModalIsOpen(true)}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            {totalItemsInCart > 0 && totalItemsInCart < 100 && (
              <div className="cart-badge">{totalItemsInCart}</div>
            )}
            {totalItemsInCart >= 100 && <div className="cart-badge99">+99</div>}
          </div>
          {cartModalIsOpen && (
            <CartModal
              isOpen={cartModalIsOpen}
              onClose={() => setCartModalIsOpen(false)}
            />
          )}
          {user && (
            <div
              className="user-icon-container"
              onClick={() => {
                setUserModalIsOpen(true);
              }}
            >
              <Link to="/user-profile">
                <FontAwesomeIcon icon={faUser} className="user-icon" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
