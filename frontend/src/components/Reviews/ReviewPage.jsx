import React, { useEffect, useState } from "react";
import ReviewComponent from "./ReviewComponent";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from 'api/reviews/all'
    fetch("api/reviews/all")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div>
      <h1>Review Page</h1>
      {reviews &&
        reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} showMovie={true} />
        ))}
    </div>
  );
};

export default ReviewPage;
