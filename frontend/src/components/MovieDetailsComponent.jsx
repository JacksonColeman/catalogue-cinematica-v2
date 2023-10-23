// MovieDetailsComponent.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CastThumbnailComponent from './CastThumbnailComponent';
import './MovieDetailsComponent.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const MovieDetailsComponent = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`
          https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&api_key=${'67efd9f8bb8609b38ab7599192991049'}`);
        const data = await response.json();
        setMovieDetails(data);
        console.log(data);
      } catch (error) {
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const addToWatchlist = (movieId) => {
    // Check if there is an existing watchlist in local storage
    const existingWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
    // Check if the movieId is already in the watchlist
    const isAlreadyInWatchlist = existingWatchlist.includes(movieId);
  
    if (!isAlreadyInWatchlist) {
      // If the movieId is not in the watchlist, add it
      const updatedWatchlist = [...existingWatchlist, movieId];
  
      // Save the updated watchlist to local storage
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  
      console.log(`Movie with ID ${movieId} added to watchlist`);
    } else {
      // If the movieId is already in the watchlist, you might want to handle this case
      // You could show a message to inform the user that the movie is already in the watchlist
      console.log(`Movie with ID ${movieId} is already in the watchlist`);
    }
  };

  const director = movieDetails.credits.crew.filter(({ job }) => job === 'Director');
  const cast = movieDetails.credits.cast;
  const backdrop = `https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}`;

  return (
    <div className="movie-details-container">
      {/* Container for the backdrop image */}
        
        <div className="backdrop-container">
            <Link to='/'>
                <h1 className="cc-header">Catalogue Cinematica</h1>
            </Link>
            <img src={backdrop} className="backdrop-image" alt="Movie backdrop not found" />

        <div>
            <button onClick={() => addToWatchlist(id)} className='watchlist-button'>Add to Watchlist</button>
        </div>

        <div className='bottom-half-container'>
            <div className="text-container">
                <strong className="movie-title">{movieDetails.title.toUpperCase()}</strong>
                {director[0] ? <p className='director'> Directed by <strong>{director[0]?.name}</strong></p> : null}
                <p className="release-date">Released {movieDetails.release_date.slice(0, 4)}</p>
                <p className="runtime">Runtime: {movieDetails.runtime} mins</p>
            </div>

            <div className="overview-container">
                <strong className="tagline">{movieDetails.tagline.toUpperCase()}</strong>
                <p className="overview">{movieDetails.overview}</p>
            </div>
        </div>
      </div>

      {/* Container for text elements */}
      <div className='cast-container'>
        <h3 className='cast-title'>Cast</h3>
        <div className='cast-list'>
        {cast.map(actor => (
          <CastThumbnailComponent key={actor.id} actor={actor} />
        ))}
        </div>
       </div>
    </div>
  );
};

export default MovieDetailsComponent;