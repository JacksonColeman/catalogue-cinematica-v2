// MovieList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css'; // Import the CSS file for styling
import MovieThumbnailComponent from './MovieThumbnailComponent';


const MovieList = ({ movies }) => {
  return (
    <div className='movie-container'>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieThumbnailComponent movie={movie} key={movie.id}/>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
