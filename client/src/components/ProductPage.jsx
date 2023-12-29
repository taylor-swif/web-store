import React, { useState, useEffect } from "react";
import { useContext } from "react";
import "./ProductPage.css";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";
// import products from "../assets/dummyData";
import QuantityPicker from "./QuantityPicker";
import { CartDispatchContext } from "../context/CartContext";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  let [product, setProduct] = useState({})

  useEffect(() => {
      getProduct()
  },[])

  const getProduct = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/wines/' + id, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })

    let data = await response.json()
    
    if (response.status === 200) {
      // Temporary solution to match previously used format of wines
      console.log(data)
      setProduct({
        name: data.name,
        type: data.taste.taste + "/" + data.color.color,
        country: data.country.name,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        inStock: data.units_in_stock > 0,
        year: data.year
      })
    } else {
      console.log('Error')
    }
  }

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
      type: "added",
      item: cartItem,
    });
    onClose();
  };

  return (
    <div>
      <div className="product-page">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price}</p>
          <p className="in-stock">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
          <QuantityPicker quantity={quantity} onUpdateQuantity={setQuantity} />

          <button className="purchase-button" onClick={handleBuyClick}>
            Buy
          </button>
        </div>
      </div>

      <ProductDetails />
    </div>
  );
};

export default ProductPage;
