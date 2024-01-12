import { useState } from "react";

const ProductReviews = ({ product }) => {
  const [reviews, setReviews] = useState([]);

  return (
    <div className="reviews">
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((review) => (
        <div className="review" key={review.id}>
          <p>
            <strong>{review.user}</strong> - {review.rating}/5
          </p>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
