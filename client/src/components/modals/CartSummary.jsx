import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import PaymentModal from "./PaymentModal";
import "./CartModal.css";

const CartSummary = () => {
  const cartItems = useContext(CartContext);
  const user = useContext(AuthContext);
  console.log(user);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + itemPrice * itemQuantity;
    }, 0);

    return totalPrice.toFixed(2);
  };

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handleNotLoggedUser = () => {
    alert("User must be logged in");
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="cart-summary">
      <p>Total Price: {calculateTotalPrice(cartItems)}</p>
      <button
        className="go-to-payment-button"
        onClick={
          user.username === undefined ? handlePayment : handleNotLoggedUser
        }
      >
        Go to Payment
      </button>

      {showPaymentModal && (
        <PaymentModal
          onClose={handleClosePaymentModal}
          onPaymentSuccess={handleClosePaymentModal}
        />
      )}
    </div>
  );
};

//TODO: trzeba dodać opcje clearowania koszyka i update'owania bazy

export default CartSummary;
