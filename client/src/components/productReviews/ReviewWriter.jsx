import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const ReviewWriter = ({ product }) => {
  const [review, setReview] = useState("");
  const { authTokens, logoutUser } = useContext(AuthContext);
  let [profile, setProfile] = useState([]);
  const [formData, setFormData] = useState({});

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitReview = () => {
    setFormData(() => ({
      content: review,
      rating: 5,
    }));
    console.log(formData);
    setReview("");
    handleReview();
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleReview = async () => {
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/wines/1/reviews/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Review written successfully!");
      } else {
        console.error("Failed to write review:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while processing review:", error);
    }
  };

  const getProfile = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setProfile(data);
      console.log(profile);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };
  return (
    <>
      <div className="review-form">
        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review here..."
          rows="4"
        ></textarea>
        <button onClick={submitReview}>Submit Review</button>
      </div>
    </>
  );
};

export default ReviewWriter;
