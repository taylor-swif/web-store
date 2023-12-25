import React from 'react';
import Modal from 'react-modal';
import './cartmodal.css';

const CartModal = ({ cartItems, isOpen, onClose, onUpdateQuantity }) => {
    const calculateTotalPrice = (cartItems) => {  
        const totalPrice = cartItems.reduce((total, item) => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQuantity = parseInt(item.quantity) || 0;
          return total + itemPrice * itemQuantity;
        }, 0);
      
        return totalPrice.toFixed(2);
    };
    
    const handleQuantityChange = (event, productId) => {
      const newQuantity = Math.max(parseInt(event.target.value, 10), 1);
      onUpdateQuantity(productId, newQuantity);
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
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <p>{item.name}</p>
                            <p>
                                Quantity: {' '}
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(e, item.id)}
                                />
                            </p>
                            <p>Price: {item.price}</p>
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
