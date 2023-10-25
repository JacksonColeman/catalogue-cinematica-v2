import React from 'react';

const ReviewComponent = ({ review }) => {
  const { text, rating, user, created_at } = review;

  return (
    <div className="review">
      <h3>Rating: {rating}</h3>
      <p>{text}</p>
      <p>
        By {user.username} on {new Date(created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewComponent;