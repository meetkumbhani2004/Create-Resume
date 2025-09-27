import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import logo from "./meet-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {

    localStorage.removeItem("currentUser");
    setUser(null);
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="navbar">
      <form className="Dashboard-f">
        <div>
          <h2>{user ? `${user.firstName} ${user.lastName}` : "Guest"}</h2>
          <h3>{user ? `${user.email}` : "No email"}</h3>
        </div>
        <img src={logo} alt="logo" className="nav-logo"/>

        {user ? (
          <button className="login-btn1" onClick={handleLogout} type="button">
            Logout
          </button>
        ) : (
          <button
            className="login-btn1"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </form>

    </div>
  );
};

export default Navbar;
