import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

const LoginModal = ({ open, handleCloseModal }) => {
  if (!open) {
    return null;
  }

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // You can handle success as needed
        window.location.reload();
      } else {
        // Convert the errors array to a string
        console.log(data.errors);
        setErrors(data.errors); // Set the string in the state
      }
    } catch (error) {
      setErrors([error.message] || ["An error occurred"]); // Set a default error message
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="modal-component">
      <div className="overlay" onClick={handleCloseModal}></div>
      <div className="login-modal-container">
        <button className="btn--close-modal" onClick={handleCloseModal}>
          x
        </button>
        <div>
          <h3>Login</h3>
          <form>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>
              Log In
            </button>
          </form>
          {errors.map((error) => (
            <p>{error}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
