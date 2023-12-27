import React, { useState } from 'react';
import './ProductPage.css';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router-dom';
import products from '../assets/dummyData';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = products[id];

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div>
        <div className="product-page">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="price">{product.price}</p>
                <p className="in-stock">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                <div className="quantity-selector">
                <button onClick={decrementQuantity}>-</button>
                <input type="text" value={quantity} readOnly />
                <button onClick={incrementQuantity}>+</button>
                </div>
                <button className="purchase-button">Buy</button>
            </div>
        </div>
    
    <ProductDetails />
  </div>
  );
};

export default ProductPage;

