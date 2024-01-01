import React, { useState } from "react";
import "./ProductDetails.css";

const ProductDetails = ({ product }) => {
  const [activeSection, setActiveSection] = useState("description");
  const [review, setReview] = useState("");

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitReview = () => {
    // Logic to handle review submission
    console.log(review);
    setReview(""); // Clear the review input after submission
  };

  return (
    <div className="product-details">
      <div className="tabs">
        <button
          className={activeSection === "description" ? "tab active" : "tab"}
          onClick={() => setActiveSection("description")}
        >
          Description
        </button>
        <button
          className={activeSection === "reviews" ? "tab active" : "tab"}
          onClick={() => setActiveSection("reviews")}
        >
          Reviews
        </button>
        <button
          className={activeSection === "delivery" ? "tab active" : "tab"}
          onClick={() => setActiveSection("delivery")}
        >
          Delivery
        </button>
      </div>
      {activeSection === "description" && (
        <div className="description">
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Type:</strong> {product.type}
          </p>
          <p>
            <strong>Country:</strong> {product.country}
          </p>
          <p>
            <strong>Vintage:</strong> {product.year}
          </p>
          <p>
            <strong>Alcohol:</strong> {product.alcohol}%
          </p>
        </div>
      )}
      {activeSection === "reviews" && (
        <div className="reviews">
          {/* Existing reviews */}
          <div className="review-form">
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here..."
              rows="4"
            ></textarea>
            <button onClick={submitReview}>Submit Review</button>
          </div>
        </div>
      )}
      {activeSection === "delivery" && (
        <div className="delivery">
          <h3>Delivery Information</h3>
          <p>
            1. Delivery to the "Nova Poshta" office, free from 420 ZŁ. (for
            orders up to 420 ZŁ, the cost of delivery and packaging is 25 Zł).
          </p>
          {/* Add more delivery information here */}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
