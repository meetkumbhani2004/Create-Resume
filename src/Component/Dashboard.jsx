import React from "react";
import { useNavigate } from "react-router-dom";

const Homepaze = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white px-5">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Glassy form card */}
      <form
        className="
          relative z-10 w-full max-w-md rounded-2xl 
          bg-white/10 backdrop-blur-md text-center
          shadow-2xl p-8 sm:p-10
        "
      >
        <h1
          className="
            mb-8 text-3xl sm:text-4xl font-bold italic text-white
            drop-shadow-[1px_1px_5px_rgba(0,0,0,0.6)]
          "
        >
          Welcome to M K Developer
        </h1>

        {/* Buttons */}
        <div className="flex flex-col items-center space-y-4">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              w-4/5 max-w-xs rounded-full bg-teal-900 px-6 py-3
              text-lg text-white shadow-md transition
              hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-xl
            "
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="
              w-4/5 max-w-xs rounded-full bg-teal-900 px-6 py-3
              text-lg text-white shadow-md transition
              hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-xl
            "
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => navigate("/resume")}
            className="
              w-4/5 max-w-xs rounded-full bg-teal-900 px-6 py-3
              text-lg text-white shadow-md transition
              hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-xl
            "
          >
            Build your free Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default Homepaze;
