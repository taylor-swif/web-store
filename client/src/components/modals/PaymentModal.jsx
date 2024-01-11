import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./PaymentModal.css";

const PaymentModal = ({ onClose, onPaymentSuccess }) => {
  const cartItems = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    zip_code: "",
    country: "",
    phone_number: "",
    email: "",
    order_details: cartItems.map((item) => ({
      wine_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
    })),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onPaymentSuccess();
      } else {
        console.error("Failed to make payment:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while processing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2 className="payment-h2">Payment Details</h2>
        <p>Enter your payment information:</p>
        <input
          className="payment-input"
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <input
          className="payment-input"
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        <input
          className="payment-input"
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <input
          className="payment-input"
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
        />
        <input
          className="payment-input"
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          value={formData.zip_code}
          onChange={handleInputChange}
        />
        <input
          className="payment-input"
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
        />
        <input
          className="payment-input"
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleInputChange}
        />
        <input
          className="payment-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {/* Dodaj pozostałe inputy dla danych płatności, jeśli są potrzebne */}
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
