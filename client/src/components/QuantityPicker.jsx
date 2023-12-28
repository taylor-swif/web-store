import React from "react";
import "./QuantityPicker.css";

const QuantityPicker = ({ quantity = 1, onUpdateQuantity }) => {
  const handleQuantityChange = (event) => {
    onUpdateQuantity(Math.max(parseInt(event.target.value), 1));
  };

  const handleIncrementButton = () => {
    onUpdateQuantity(quantity + 1);
  };

  const handleDecrementButton = () => {
    onUpdateQuantity(quantity - 1 >= 1 ? quantity - 1 : 1);
  };

  return (
    <>
      <div className="quantity-selector">
        <button onClick={handleDecrementButton}>-</button>
        <input type="text" value={quantity} readOnly />
        <button onClick={handleIncrementButton}>+</button>
      </div>
    </>
  );
};

export default QuantityPicker;
