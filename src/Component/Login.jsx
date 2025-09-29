import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      alert("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      navigate("/resume");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white px-5">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Glass card */}
      <div
        className="
          relative z-10 w-full max-w-md rounded-2xl
          bg-white/10 backdrop-blur-md
          p-8 sm:p-10 text-center shadow-2xl
        "
      >
        <h3
          className="
            mb-8 text-3xl sm:text-4xl font-bold text-white
            drop-shadow-[1px_1px_5px_rgba(0,0,0,0.6)]
          "
        >
          LOGIN
        </h3>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-4/5 rounded-lg border-none bg-white/90
              px-4 py-3 text-base text-gray-800
              focus:outline-none focus:ring-2 focus:ring-amber-400
              transition
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-4/5 rounded-lg border-none bg-white/90
              px-4 py-3 text-base text-gray-800
              focus:outline-none focus:ring-2 focus:ring-amber-400
              transition
            "
          />

          {/* Register link */}
          <p className="text-sm text-white">
            If you don't have an account, please{" "}
            <Link
              to="/register"
              className="text-amber-300 underline hover:text-white transition"
            >
              Register Here
            </Link>
          </p>

          {/* Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              type="submit"
              className="
                flex-1 rounded-full bg-teal-900 px-6 py-3
                text-lg text-white shadow-md transition
                hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-xl
              "
            >
              Login
            </button>

            <Link
              to="/"
              className="
                flex-1 rounded-md bg-amber-400 px-6 py-3
                text-lg text-white text-center shadow-md transition
                hover:-translate-y-1 hover:bg-amber-500 hover:shadow-xl
              "
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
