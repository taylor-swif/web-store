import React, { useState } from 'react';
import './ProductPage.css';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router-dom';
import products from '../assets/dummyData';
import QuantityPicker from './QuantityPicker';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = products[id];

  return (
    <div>
        <div className="product-page">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="price">{product.price}</p>
                <p className="in-stock">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                <QuantityPicker quantity={quantity} onUpdateQuantity={setQuantity} />

                <button className="purchase-button">Buy</button>
            </div>
        </div>
    
    <ProductDetails />
  </div>
  );
};

export default ProductPage;

