import React from "react";
import "./Review.css";
function Review({ date, name, text, rating }) {
  return (
    <div className="review-container">
      <h4 className="review-content"> {name}</h4>
      <h4 className="review-content">{date}</h4>
      {text ? (
        <p className="review-content">{text}</p>
      ) : (
        <p className="review-content">
          This user did not leave detailed review
        </p>
      )}
      <h5 className="review-content"> {rating} Stars</h5>
    </div>
  );
}

export default Review;
