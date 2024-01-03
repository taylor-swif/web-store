import React, { useState } from "react";
import "./styles/OrderTable.css";

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
];
const OrderTable = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleRowExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Value</th>
          <th>Number of Wines</th>
        </tr>
      </thead>
      <tbody>
        {ordersData.map((order) => (
          <>
            <tr
              key={order.orderId}
              onClick={() => toggleRowExpansion(order.orderId)}
            >
              <td>{order.orderId}</td>
              <td>{order.date}</td>
              <td>{order.value}</td>
              <td>{order.numberOfWines}</td>
            </tr>
            {expandedOrderId === order.orderId && (
              <tr className="order-details">
                <td colSpan="4">{order.details}</td>
                adres dostawy list win, ilosc, cena
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
