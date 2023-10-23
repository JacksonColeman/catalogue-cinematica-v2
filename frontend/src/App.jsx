import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'
import MovieDetailsComponent from './components/MovieDetailsComponent'
import { Routes, Route, useNavigate, Link} from 'react-router-dom'
import Watchlist from './components/Watchlist'

const App = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  
  const fetchDiscoverMovies = async () => {
    try {
      const apiEndpoint = 'https://api.themoviedb.org/3/discover/movie';
      const response = await fetch(`${apiEndpoint}?api_key=${'67efd9f8bb8609b38ab7599192991049'}&append_to_response=credits`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching discover movies:', error);
    }
  };

  useEffect(() => {
    // Fetch discover movies when the component mounts
    fetchDiscoverMovies();
  }, []);


  useEffect(() => {
    // Fetch discover movies when the user returns to '/'
    fetchDiscoverMovies();
    return;
  }, [navigate]);

  const handleSearch = async (query) => {
    // Call the API to search for movies
    if (query == ""){
      fetchDiscoverMovies()
      return
    }
    try {
      const apiEndpoint = 'https://api.themoviedb.org/3/search/movie';
      const response = await fetch(`${apiEndpoint}?&append_to_response=credits&include_adult=false&query=${query}&api_key=${'67efd9f8bb8609b38ab7599192991049'}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
    }
  };


  return (
      <div className='app'>
        <Routes>
          <Route path="/movie/:id"
            element = {<MovieDetailsComponent />}
          />
          <Route path="/"
            element = {
              <div className='home-page'>
                <div className='watchlist-link'>
                  <Link to='/watchlist'>My Watchlist</Link>
                </div>
                <h1 className='main-page-header'>Catalogue Cinematica</h1>
                <SearchBar onSearch={handleSearch} />
                <MovieList movies={movies} />
              </div>
              }
            />
            <Route path='/watchlist'
              element={<Watchlist/>}
            />
        </Routes>
      </div>
  );
};

export default App;
