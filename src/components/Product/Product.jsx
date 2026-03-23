import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import "./Product.scss";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleAddToCart = () => {
    dispatch(addItem(product));
    setShowToast(true);
    setProgress(100);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          setShowToast(false);
          return 0;
        }
        return prev - (100 / 30); // 30 steps for 3 seconds (100ms intervals)
      });
    }, 100);
  };

  return (
    <>
      <div className="product-card">

        <div className="product-image">
          <img src={product.image} alt={product.name} />

          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">₹{product.price}</p>
        </div>

      </div>

      {showToast && (
        <div className="toast">
          <div className="toast-content">
            Item added to cart!
          </div>
          <div className="toast-progress">
            <div 
              className="toast-progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;