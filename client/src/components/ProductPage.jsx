import { useState, useContext } from "react";
import "./styles/ProductPage.css";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";
import QuantityPicker from "./QuantityPicker";
import { CartDispatchContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const products = useContext(ProductContext);
  const product = products[id];

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
