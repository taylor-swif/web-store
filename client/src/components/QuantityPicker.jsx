import './quantitypicker.css';

const QuantityPicker = ({ quantity, onUpdateQuantity }) => {
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
    <div className="quantity-container">
      <button className="quantity-button" onClick={handleDecrementButton}>
        -
      </button>
      <input
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        className="quantity-input"
      />
      <button className="quantity-button" onClick={handleIncrementButton}>
        +
      </button>
    </div>
  );
};

export default QuantityPicker;
