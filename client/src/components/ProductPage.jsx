import React, { useState } from 'react';
import { useContext } from 'react';
import './ProductPage.css';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router-dom';
import products from '../assets/dummyData';
import QuantityPicker from './QuantityPicker';
import { CartDispatchContext } from '../context/CartContext';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = products[id];

  const dispatch = useContext(CartDispatchContext);

  const handleBuyClick = () => {
    const cartItem = {
      id: product.id,
      image: product.imageUrl,
      name: product.name,
      quantity: quantity,
      price: product.price,
    };
    dispatch({
      type: 'added',
      item: cartItem
    });
    onClose();
  };


  return (
    <div>
        <div className="product-page">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="price">{product.price}</p>
                <p className="in-stock">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                <QuantityPicker quantity={quantity} onUpdateQuantity={setQuantity} />

                <button className="purchase-button" onClick={handleBuyClick}>Buy</button>
            </div>
        </div>
    
    <ProductDetails />
  </div>
  );
};

export default ProductPage;

