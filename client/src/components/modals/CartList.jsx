import React from 'react';
import { useContext } from 'react';
import { CartContext, CartDispatchContext } from '../../context/CartContext';
import './cartmodal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const CartList = () => {
    const cartItems = useContext(CartContext);
    const dispatch = useContext(CartDispatchContext);
  return (
    <>
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
              <div className="quantity-selector">
                <button onClick={() => {
                    dispatch({
                    type: 'decrement',
                    id: item.id,
                    }); 
                }}>-</button>
                <input type="text" value={item.quantity} readOnly />
                <button onClick={() => {
                    dispatch({
                    type: 'increment',
                    id: item.id,
                    }); 
                }}>+</button>
            </div>
              <p>Price: {item.price} ZŁ</p>
              <div className="trash-icon" onClick={() => {
                    dispatch({
                    type: 'deleted',
                    id: item.id,
                    }); 
                }}>
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartList;