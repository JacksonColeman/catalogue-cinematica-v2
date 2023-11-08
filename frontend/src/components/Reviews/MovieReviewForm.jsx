import React, { useState } from "react";
import "./MovieReviewForm.css";
import StarRating from "../Sandbox Elements/StarRating";
import "../Sandbox Elements/StarRating.css";
import Rating from "@mui/material/Rating";

const MovieReviewForm = ({ movie, postMovie, active }) => {
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rateValue, setRateValue] = useState(0);
  // const [isActive, setIsActive] = useState(active);

  if (!active) {
    return null;
  }

  const checkIfMovieExists = async () => {
    try {
      const response = await fetch(`/api/movies/${movie.id}`);
      if (!response.ok) {
        // Movie does not exist, post it
        await postMovie();
      }
    } catch (error) {
      console.error("Error checking if movie exists:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await checkIfMovieExists();

    const reviewData = {
      rating: rateValue,
      text: reviewText,
      tmdb_id: movie.id,
      spoilers: false,
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you might need, e.g., authorization headers
        },
        body: JSON.stringify({ review: reviewData }),
      });

      if (!response.ok) {
        throw new Error("Review submission failed");
      }

      const data = await response.json();
      console.log("Review submitted successfully:", data);

      // Do something with the response, like displaying a success message
    } catch (error) {
      console.error("Review submission error:", error);
      // Handle the error as needed, like displaying an error message
    }
  };

  return (
    <div className="movie-review-form">
      <div className="overlay" onClick={() => setIsActive(false)}></div>
      <div className="review-modal">
        <h2>Movie Review Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="star-rating-component" value={rateValue}>
            <Rating
              precision={0.5}
              onChange={(e, value) => setRateValue(value * 2)}
            />
            <p>Rating: {rateValue}</p>
          </div>
          <br />

          <label htmlFor="reviewText">Review Text: </label>
          <textarea
            id="reviewText"
            name="reviewText"
            rows="4"
            cols="50"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>

          <br />

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default MovieReviewForm;
