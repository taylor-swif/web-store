import "./styles/OrderTableDetailsRow.css";

const OrderTableDetailsRow = ({ product, details }) => {
  return (
    <tr className="order-details-row">
      <td>
        {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      </td>
      <td>{product.name}</td>
      <td>{details.quantity}</td>
      <td>{details.totalPrice}</td>
    </tr>
  );
};

export default OrderTableDetailsRow;
