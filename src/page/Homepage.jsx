import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
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
    <section className="text-center py-20 bg-gradient-to-b from-green-50 to-white" id="home">
      <div className="mb-4">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          🆕 AI Feature Added
        </span>
      </div>

      <div className="flex justify-center items-center mt-8 space-x-2">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt=""
          className="w-8 h-8 rounded-full border"
        />
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt=""
          className="w-8 h-8 rounded-full border"
        />
        <img
          src="https://randomuser.me/api/portraits/men/36.jpg"
          alt=""
          className="w-8 h-8 rounded-full border"
        />
        <p className="text-gray-700 font-medium ml-2">
          ⭐ Used by 10,000+ users
        </p>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-8 leading-tight">
        Land your dream job with <br />
        <span className="text-green-600">AI-powered</span> resumes.
      </h1>

      <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
        Create, edit and download professional resumes with AI-powered assistance.
      </p>

      <div className="flex justify-center space-x-4 mt-8">
        {/* ✅ Button logic added here */}
        <button
          onClick={handleGetStarted}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium text-lg transition-all"
        >
          Get started →
        </button>

        <button className="border border-gray-300 hover:border-green-500 px-6 py-3 rounded-full text-gray-700 font-medium text-lg transition-all">
          🎥 Try demo
        </button>
      </div>
    </section>
  );
}
