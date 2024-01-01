import React from "react";
import { useContext } from "react";
import { CartContext, CartDispatchContext } from "../../context/CartContext";
import "./CartModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import QuantityPicker from "../QuantityPicker";

const CartList = () => {
  const cartItems = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  return (
    <>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item-container">
          <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <p className="cart-item-name">{item.name}</p>
              <p>
                <QuantityPicker
                  quantity={item.quantity}
                  maxQuantity={item.maxQuantity}
                  onUpdateQuantity={(newQuantity) => {
                    dispatch({
                      type: "updated",
                      id: item.id,
                      quantity: newQuantity,
                    });
                  }}
                />{" "}
                of <strong>{item.maxQuantity}</strong>
              </p>
              <p>Price: {item.price} ZŁ</p>
              <div
                className="trash-icon"
                onClick={() => {
                  dispatch({
                    type: "deleted",
                    id: item.id,
                  });
                }}
              >
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
