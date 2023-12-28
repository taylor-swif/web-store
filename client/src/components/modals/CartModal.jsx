import React from "react";
import Modal from "react-modal";
import "./CartModal.css";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

const CartModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cart Items"
      className="custom-cart-modal"
      overlayClassName="cart-overlay"
      appElement={document.getElementById("root")}
    >
      <CartList />
      <CartSummary />
    </Modal>
  );
};

export default CartModal;
