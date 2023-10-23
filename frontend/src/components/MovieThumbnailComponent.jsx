import { Link } from "react-router-dom"
import './MovieThumbnailComponent.css'

const MovieThumbnailComponent = ({movie}) => {

return (
    <div key={movie.id} className="movie-item">  
                {
                <Link to={`/movie/${movie.id}`}>
                    <img className="movie-poster"
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Grey_background.jpg/848px-Grey_background.jpg'}
                    alt={`${movie.title} Poster`}
                    />
                    <div className='movie-item-title'>{movie.title.toUpperCase()}</div>
                </Link>
                }
            </div>
)
}

export default MovieThumbnailComponent