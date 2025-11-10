import React from "react";
import { useNavigate } from "react-router-dom";

const Contect = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-20 bg-gradient-to-b from-white to-green-50"
    >
      {/* Left Side - Text */}
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Build a Professional Resume
        </h2>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Stand out and get hired with an expertly crafted resume that showcases
          your skills and achievements.
        </p>
      </div>

      {/* Right Side - Button */}
      <div className="flex justify-center md:justify-end md:w-1/2">
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 bg-green-500 text-white font-medium text-lg rounded-full hover:bg-green-600 shadow-md transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Contect;
