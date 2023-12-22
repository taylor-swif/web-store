import React from "react";
import ProductCard from './ProductCard';
import './ProductList.css';

const products = [
    {
      name: 'Orvieto Classico',
      country: 'Italy',
      type: 'White/Dry',
      price: '289 ZŁ',
      rating: 5,
      imageUrl: 'https://picsum.photos/150/150?random=1',
    },
    {
      name: 'Monastrell Salina',
      country: 'Spain',
      type: 'Red/Dry',
      price: '299 ZŁ',
      rating: 3.5,
      imageUrl: 'https://picsum.photos/150/150?random=2',
    },
  ];

const ProductList = () => {
    return (
    <div className="product-list">
        {products.map((product, index) => (
        <ProductCard key={index} product={product} />
        ))}
    </div>
    );
  };

export default ProductList;