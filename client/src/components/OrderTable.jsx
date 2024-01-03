import React, { useState, useContext } from "react";
import "./styles/OrderTable.css";
import { ProductContext } from "../context/ProductContext";
import OrderTableDetailsRow from "./OrderTableDetailsRow";

const OrderTable = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  const products = useContext(ProductContext);

  const findOrderDetails = (orderId) => {
    return od.filter((detail) => detail.orderId === orderId);
  };

  const toggleRowExpansion = (orderId) => {
    setExpandedOrderId((prevExpandedOrderId) =>
      prevExpandedOrderId === orderId ? null : orderId
    );

    if (!orderDetails.find((detail) => detail.orderId === orderId)) {
      const details = findOrderDetails(orderId);
      setOrderDetails((prevOrderDetails) => [...prevOrderDetails, ...details]);
    }
  };

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Value</th>
          <th>Number of Wines</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ordersData.map((order) => (
          <React.Fragment key={order.orderId}>
            <tr className={expandedOrderId === order.orderId ? "expanded" : ""}>
              <td>{order.orderId}</td>
              <td>{order.date}</td>
              <td>{order.value}</td>
              <td>{order.numberOfWines}</td>
              <td className="details-button-cell">
                <button onClick={() => toggleRowExpansion(order.orderId)}>
                  {expandedOrderId === order.orderId ? "Hide" : "Details"}
                </button>
              </td>
            </tr>
            {expandedOrderId === order.orderId && (
              <tr className="order-details" key={order.orderId}>
                <td colSpan="5">
                  <ul>
                    {findOrderDetails(order.orderId).map((detail, index) => (
                      <OrderTableDetailsRow
                        key={index}
                        product={products[detail.productId]}
                        details={detail}
                      />
                    ))}
                  </ul>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;

const ordersData = [
  {
    orderId: "1001",
    date: "2024-01-02",
    value: "$120.00",
    numberOfWines: 3,
    details: "Order details for order 1001...",
  },
  {
    orderId: "1002",
    date: "2024-01-01",
    value: "$150.00",
    numberOfWines: 3,
    details: "Order details for order 1002...",
  },
  {
    orderId: "1003",
    date: "2024-01-01",
    value: "$110.00",
    numberOfWines: 3,
    details: "Order details for order 1003...",
  },
  {
    orderId: "1004",
    date: "2024-01-01",
    value: "$115.00",
    numberOfWines: 3,
    details: "Order details for order 1004...",
  },
  {
    orderId: "1005",
    date: "2024-01-01",
    value: "$78.00",
    numberOfWines: 3,
    details: "Order details for order 1005...",
  },
];

const od = [
  {
    orderId: "1001",
    productId: "1",
    quantity: "5",
    totalPrice: "150$",
  },
  {
    orderId: "1001",
    productId: "3",
    quantity: "1",
    totalPrice: "150$",
  },
  {
    orderId: "1001",
    productId: "8",
    quantity: "3",
    totalPrice: "150$",
  },
  {
    orderId: "1001",
    productId: "17",
    quantity: "10",
    totalPrice: "150$",
  },
  {
    orderId: "1001",
    productId: "82",
    quantity: "15",
    totalPrice: "150$",
  },
  {
    orderId: "1002",
    productId: "82",
    quantity: "15",
    totalPrice: "150$",
  },
];
