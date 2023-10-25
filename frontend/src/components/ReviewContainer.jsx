import React, { useEffect, useState } from 'react';
import ReviewComponent from './ReviewComponent.jsx';

const ReviewContainer = ({ movie }) => {
    const [reviews, setReviews] = useState([]); // Use 'const' here

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/reviews/?tmdb_id=${movie.id}`);
                if (!response.ok) {
                    throw new Error('Fetch failed');
                }

                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                // Handle the error as needed
            }
        };

        fetchData();
    }, [movie.id]); // Add movie.id as a dependency to useEffect

    return (
        <div className="review-container">
            <h2>Reviews</h2>
            {reviews ? reviews.map((review) => (
                <ReviewComponent key={review.id} review={review} />
            )) : ''}
        </div>
    );
};

export default ReviewContainer;