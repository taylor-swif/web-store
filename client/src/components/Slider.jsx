import React, { useState, useEffect } from "react";
import "./Slider.css";

const images = [
  "/src/assets/slider/slider1.png",
  "/src/assets/slider/slider2.png",
  "/src/assets/slider/slider3.png",
];

const Slider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="image-slider">
      <img
        src={images[currentImageIndex]}
        alt={`Wine Bottle ${currentImageIndex + 1}`}
      />
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentImageIndex === index ? "active" : ""}`}
            onClick={() => goToImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
