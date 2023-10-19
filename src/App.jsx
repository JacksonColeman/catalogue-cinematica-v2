import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'
import MovieDetailsComponent from './components/MovieDetailsComponent'
import { Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [movies, setMovies] = useState([]);
  const handleSearch = async (query) => {
    // Call the API to search for movies
    try {
  const apiEndpoint = 'https://api.themoviedb.org/3/search/movie';
      const response = await fetch(`${apiEndpoint}?query=${query}&api_key=${'67efd9f8bb8609b38ab7599192991049'}&append_to_response=credits`);
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div>
        <Routes>
          <Route path="/movie/:id"
            element = {<MovieDetailsComponent />}
          />
          <Route path="/"
            element = {
              <div>
                <h1>Catalogue Cinematica</h1>
                <SearchBar onSearch={handleSearch} />
                <MovieList movies={movies} />
              </div>
              }
            />
        </Routes>
      </div>
  );
};

export default App;
