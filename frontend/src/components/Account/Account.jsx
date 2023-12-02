import { useNavigate } from "react-router-dom";
import "./Account.css";
import { useState, useEffect } from "react";
import ReviewComponent from "../Reviews/ReviewComponent";

const Account = ({ userId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(userData);
        } else {
          // Handle error response
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error fetching user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user data
    fetchUser();
  }, [userId]); // Run the effect when userId changes

  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
      credentials: "include", // Include credentials (cookies) in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        // Redirect to the login page or do something else upon successful logout
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Handle the error as needed
      });
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-page">
      <p>{user?.username}</p>
      <button onClick={handleLogout}>Log out</button>

      <div className="account-favorites-section">
        <h3>Favorites</h3>
        {user.movie_lists &&
          user.movie_lists.length > 0 &&
          user.movie_lists
            .filter((list) => list.name === "Favorites")[0]
            .movies.map((movie) => <div key={movie.title}>{movie.title}</div>)}
      </div>

      <div className="account-watchlist-section">
        <h3>Watchlist</h3>
        {user.movie_lists &&
          user.movie_lists.length > 0 &&
          user.movie_lists
            .filter((list) => list.name === "Watchlist")[0]
            .movies.map((movie) => <div key={movie.title}>{movie.title}</div>)}
      </div>

      <div className="account-review-section">
        <h3>Reviews</h3>
        {user.reviews &&
          user.reviews.map((review) => (
            <ReviewComponent key={review.id} review={review} showMovie={true} />
          ))}
      </div>
    </div>
  );
};
export default Account;
