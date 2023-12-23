import React from 'react';
import './ProductCard.css';

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={`full-${index}`} className="star full">★</span>
        ))}
        {halfStar && <span className="star half">★</span>}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={`empty-${index}`} className="star empty">★</span>
        ))}
      </>
    );
  };
  

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.country}/{product.type}</p>
      <p>{product.price}</p>
      <button>Buy</button>
      <div className="rating">
        {renderStars(product.rating)}
      </div>
    </div>
  );
};

export default ProductCard;
