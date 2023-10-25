import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'
import MovieDetailsComponent from './components/MovieDetailsComponent'
import { Routes, Route, useNavigate, Link} from 'react-router-dom'
import Watchlist from './components/Watchlist'
import Header from './components/Header'
import SignUp from './components/SignUp'
import Login from './components/Login'

const App = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const userName = 'John Doe'; // Replace with actual user name

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/check-login-status', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
  
      if (response.ok) {
        const data = await response.json();
        setLoggedIn(data.logged_in);
        console.log(data)
      } else {
        console.error('Failed to check login status');
      }
    } catch (error) {
      console.error('An error occurred while checking login status:', error);
    }
  };
  
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
    checkLoginStatus();
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
        <Header isLoggedIn={isLoggedIn} userName={userName}/>
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
            <Route path ='/signup'
              element={<SignUp setLoggedIn={setLoggedIn}/>}
              />
            <Route path='/login'
              element={<Login setLoggedIn={setLoggedIn}/>}
              />
        </Routes>
      </div>
  );
};

export default App;
