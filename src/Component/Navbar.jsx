import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../Images/meet-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <nav className="w-full px-4 sm:px-6 py-3">
      <div
        className="
          mx-auto flex max-w-6xl items-center justify-between
          rounded-2xl bg-slate-600 text-white
          px-4 py-3 sm:px-6 sm:py-4
        "
      >
        {/* User info */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-semibold">
            {user ? `${user.firstName} ${user.lastName}` : "Guest"}
          </h2>
          <h3 className="text-sm text-gray-200">
            {user ? user.email : "No email"}
          </h3>
        </div>

        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="h-16 w-16 sm:h-24 sm:w-24 object-contain"
        />

        {/* Button */}
        {user ? (
          <button
            type="button"
            onClick={handleLogout}
            className="
              rounded-full bg-gray-900 px-6 py-2
              text-lg sm:text-xl transition
              hover:bg-amber-500
            "
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              rounded-full bg-gray-900 px-6 py-2
              text-lg sm:text-xl transition
              hover:bg-amber-500
            "
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
