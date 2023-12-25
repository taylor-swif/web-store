import React, { useState } from 'react';
import Modal from 'react-modal';
import './itembuymenu.css';

const ItemBuyMenu = ({ product, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10) || 1);
  };

  const handleIncrementButton = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementButton = () => {
    setQuantity(quantity - 1 >= 1 ? quantity - 1 : 1);
  };

  const handleBuyClick = () => {
    const cartItem = {
      id: product.id,
      image: product.imageUrl,
      name: product.name,
      quantity: quantity,
      price: product.price,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Item Buy Menu"
      className="item-custom-modal"
      overlayClassName="item-buy-overlay"
    >
      <div className="item-buy-menu">
        <div className="item-buy-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="item-buy-details">
          <div className="item-buy-header">
            <h2>{product.name}</h2>
          </div>
          <p>{product.country}/{product.type}</p>
          <p>{product.price}</p>
          <p>On stock: 69</p>
          <div className="quantity-container">
            <button className="quantity-button" onClick={handleDecrementButton}>-</button>
            <input
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button className="quantity-button" onClick={handleIncrementButton}>+</button>
          </div>
          <button id="add-to-cart-button" onClick={handleBuyClick}>Add to cart</button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemBuyMenu;
