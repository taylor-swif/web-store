import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./cartmodal.css";

const CartSummary = () => {
  const cartItems = useContext(CartContext);

  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + itemPrice * itemQuantity;
    }, 0);

    return totalPrice.toFixed(2);
  };

  return (
    <div className="cart-summary">
      <p>Total Price: {calculateTotalPrice(cartItems)}</p>
      <button className="go-to-payment-button">Go to Payment</button>
    </div>
  );
};
//TODO: Add paying mechanic

export default CartSummary;
