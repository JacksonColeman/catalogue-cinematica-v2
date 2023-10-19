import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {

    const posterURL = 'https://image.tmdb.org/t/p/original/'
    return (
      <div>
        <h2>Movie Results</h2>
        <div>
        {movies.map(movie => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            {movie.poster_path && (
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              </Link>
            )}
          </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default MovieList;