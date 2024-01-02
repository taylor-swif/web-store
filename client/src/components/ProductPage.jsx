import React, { useState, useEffect } from "react";
import { useContext } from "react";
import "./styles/ProductPage.css";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";
// import products from "../assets/dummyData";
import QuantityPicker from "./QuantityPicker";
import { CartDispatchContext } from "../context/CartContext";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  let [product, setProduct] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/wines/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      // Temporary solution to match previously used format of wines
      console.log(data);
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
        amount: data.units_in_stock,
        year: data.year,
        alcohol: data.alcohol,
        volume: data.volume,
      });
    } else {
      console.log("Error");
    }
  };

  const dispatch = useContext(CartDispatchContext);

  const handleBuyClick = () => {
    const cartItem = {
      id: product.id,
      image: product.imageUrl,
      name: product.name,
      quantity: quantity,
      maxQuantity: product.amount,
      price: product.price,
    };
    dispatch({
      type: "added",
      item: cartItem,
    });
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
          <p className="price">{product.price} zł</p>
          <p className="in-stock">
            {product.amount > 0
              ? "In stock: " + product.amount
              : "Out of Stock"}
          </p>
          {product.amount > 0 && (
            <>
              <QuantityPicker
                quantity={quantity}
                maxQuantity={product.amount}
                onUpdateQuantity={setQuantity}
              />

              <button className="purchase-button" onClick={handleBuyClick}>
                Buy
              </button>
            </>
          )}
        </div>
      </div>

      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
