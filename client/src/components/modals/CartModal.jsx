import React, { useState } from 'react';
import Modal from 'react-modal';
import './cartmodal.css';
import QuantityPicker from '../QuantityPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const CartModal = ({ isOpen, onClose }) => { 
  const [cartItems, setCartItems] = useState([]);
    const calculateTotalPrice = (cartItems) => {
        const totalPrice = cartItems.reduce((total, item) => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQuantity = parseInt(item.quantity) || 0;
          return total + itemPrice * itemQuantity;
        }, 0);
      
        return totalPrice.toFixed(2);
    };

    const handleAddToCart = (cartItem) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === cartItem.id);
    
        if (existingItemIndex !== -1) {
          // Produkt już istnieje w koszyku, zaktualizuj ilość
          const updatedCartItems = [...cartItems];
          updatedCartItems[existingItemIndex].quantity += cartItem.quantity;
          setCartItems(updatedCartItems);
        } else {
          // Produkt nie istnieje w koszyku, dodaj nowy produkt
          setCartItems(prevItems => [...prevItems, cartItem]);
        }
      };

    const handleUpdateQuantity = (productId, newQuantity) => {
        const updatedCartItems = cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
    };

    const handleRemoveItem = (productId) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedCartItems);
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Cart Items"
        className="custom-cart-modal"
        overlayClassName="cart-overlay"
      >
        <div className="cart-modal">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-container">
                  <div className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.name}</p>
                      {/* <QuantityPicker
                        quantity={item.quantity}
                        onUpdateQuantity={(newQuantity) =>
                          onUpdateQuantity(item.id, newQuantity)
                        }
                      /> */}
                      <p>Price: {item.price}</p>
                      <div className="trash-icon" onClick={() => onRemoveItem(item.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="cart-summary">
                <p>Total Price: {calculateTotalPrice(cartItems)}</p>
                <button className="go-to-payment-button">Go to Payment</button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    );
};
//TODO: Add paying mechanic
export default CartModal;