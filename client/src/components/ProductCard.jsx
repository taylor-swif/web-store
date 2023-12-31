import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import ItemBuyMenu from "./ItemBuyMenu";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={`full-${index}`} className="star full">
          ★
        </span>
      ))}
      {halfStar && <span className="star half">★</span>}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span key={`empty-${index}`} className="star empty">
          ★
        </span>
      ))}
    </>
  );
};

const ProductCard = ({ product }) => {
  const [isBuyMenuVisible, setIsBuyMenuVisible] = useState(false);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>
          {product.country}/{product.type}
        </p>
        <p>{product.price} ZŁ</p>
      </Link>
      {product.amount > 0 ? (
        <>
          <button
            onClick={() => {
              setIsBuyMenuVisible(true);
            }}
            className="buy-button"
          >
            Buy
          </button>
        </>
      ) : (
        <p>
          <br></br>
          <strong>Out of stock</strong>
        </p>
      )}
      <div className="rating">{renderStars(product.rating)}</div>
      {isBuyMenuVisible && (
        <ItemBuyMenu
          product={product}
          isOpen={isBuyMenuVisible}
          onClose={() => setIsBuyMenuVisible(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
