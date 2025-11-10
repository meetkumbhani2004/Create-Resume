import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  const isHomePage = location.pathname === "/";

  //  Smooth Scroll function
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      {/* 🔹 Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-2xl font-bold text-gray-900">Resume</span>
        <span className="text-green-500 text-4xl font-bold leading-none">.</span>
      </div>

      {/* 🏠 Middle Menu */}
      {isHomePage && (
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <button
              onClick={() => scrollToSection("#home")}
              className="hover:text-green-600 transition-colors"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("#features")}
              className="hover:text-green-600 transition-colors"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("#testimonials")}
              className="hover:text-green-600 transition-colors"
            >
              Testimonials
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("#contact")}
              className="hover:text-green-600 transition-colors"
            >
              Contact
            </button>
          </li>
        </ul>
      )}

      {/* 🔐 Right Side */}
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          {location.pathname !== "/dashboard" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition-all"
            >
              Dashboard
            </button>
          )}
          <button
            onClick={handleLogout}
            className="border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 px-4 py-2 rounded-full transition-all"
          >
            Logout
          </button>
        </div>
      ) : (
        isHomePage && (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogin}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Login
            </button>
          </div>
        )
      )}
    </nav>
  );
}
