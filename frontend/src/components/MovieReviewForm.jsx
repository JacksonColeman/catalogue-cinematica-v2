import React, { useState } from 'react';

const MovieReviewForm = ({movie, postMovie}) => {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  const checkIfMovieExists = async () => {
    try {
      const response = await fetch(`/api/movies/${movie.id}`);
      if (!response.ok) {
        // Movie does not exist, post it
        await postMovie();
      }
    } catch (error) {
      console.error('Error checking if movie exists:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await checkIfMovieExists()

    const reviewData = {
      rating: parseInt(rating, 10),
      text: reviewText,
      tmdb_id: movie.id
    };

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you might need, e.g., authorization headers
        },
        body: JSON.stringify({ review: reviewData }),
      });

      if (!response.ok) {
        throw new Error('Review submission failed');
      }

      const data = await response.json();
      console.log('Review submitted successfully:', data);

      // Do something with the response, like displaying a success message
    } catch (error) {
      console.error('Review submission error:', error);
      // Handle the error as needed, like displaying an error message
    }
  };

  return (
    <div>
      <h2>Movie Review Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating (1 to 10): </label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

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
  );
};

export default MovieReviewForm;