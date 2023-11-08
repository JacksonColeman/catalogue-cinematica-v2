import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const navigate = useNavigate();

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

  return (
    <div>
      <p>{user?.username}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};
export default Account;
