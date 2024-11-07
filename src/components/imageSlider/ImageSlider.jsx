import React, { useState } from "react";
import styles from "./ImageSlider.module.css";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.ImageSlider}>
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} />

      <div
        className={`${styles.arrow} ${styles.leftArrow}`}
        onClick={prevImage}
      >
        &lt;
      </div>
      <div
        className={`${styles.arrow} ${styles.rightArrow}`}
        onClick={nextImage}
      >
        &gt;
      </div>
    </div>
  );
};

export default ImageSlider;
