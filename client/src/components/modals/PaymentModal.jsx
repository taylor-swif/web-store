import { useState } from "react";
import "./PaymentModal.css";

const PaymentModal = ({ onClose, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2>Payment Details</h2>
        <p>Enter your payment information:</p>
        <button
          className="payment-button"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Make Payment"}
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
