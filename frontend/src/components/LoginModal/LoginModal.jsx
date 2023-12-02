import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";
import { LiaTimesSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

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
        setPassword("");
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
        <LiaTimesSolid
          className="btn--close-modal"
          onClick={handleCloseModal}
        />
        {/* <button className="btn--close-modal" onClick={handleCloseModal}>
          x
        </button> */}
        <div>
          <h3 className="modal-header">Sign In</h3>

          <form className="modal-form">
            <label className="modal-label">
              <FaUser />
              <input
                className="modal-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label className="modal-label">
              <FaLock />
              <input
                className="modal-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <div className="modal-error-container">
              {errors.map((error) => (
                <p className="error-message">{error}</p>
              ))}
            </div>
            <button
              type="button"
              className="modal-button-main"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
