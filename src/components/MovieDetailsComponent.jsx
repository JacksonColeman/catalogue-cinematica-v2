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
        console.error('Error:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const director = movieDetails.credits.crew.filter(({ job }) => job === 'Director');
  const cast = movieDetails.credits.cast;
  const backdrop = `https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}`;
  console.log(cast);

  return (
    <div className="movie-details-container">
      {/* Container for the backdrop image */}
        
        <div className="backdrop-container">
            <Link to='/'>
                <h1>Catalogue Cinematica</h1>
            </Link>
            <img src={backdrop} className="backdrop-image" alt="Movie backdrop not found" />

        <div>
            <button className='watchlist-button'>Add to Watchlist</button>
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