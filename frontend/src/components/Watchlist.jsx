import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieThumbnailComponent from './MovieThumbnailComponent';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Retrieve movie IDs from local storage
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  }, []);

  return (
    <div>
      <h2>My Watchlist</h2>
      <div className="watchlist-container">
        {watchlist.map((movieId) => (
          <WatchlistItem key={movieId} movieId={movieId} />
        ))}
      </div>
    </div>
  );
};

const WatchlistItem = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`
          https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&api_key=${'67efd9f8bb8609b38ab7599192991049'}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to={`/movie/${movieDetails.id}`}>
        <MovieThumbnailComponent movie={movieDetails} />
      </Link>
    </div>
  );
};

export default Watchlist;