import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("User already exists. Please login.");
      return;
    }

    const newUser = { firstName, lastName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-5">
      {/* optional overlay if you later add background images */}
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="
          relative z-10 w-full max-w-md
          rounded-2xl bg-white/10 backdrop-blur-md
          p-8 sm:p-10 text-center shadow-2xl
        "
      >
        <h2 className="mb-8 text-3xl sm:text-4xl font-semibold text-white drop-shadow-[1px_1px_5px_rgba(0,0,0,0.6)]">
          SIGN UP
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-4/5 rounded-lg bg-[#F7F5EF] px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-4/5 rounded-lg bg-[#F7F5EF] px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-4/5 rounded-lg bg-[#F7F5EF] px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-4/5 rounded-lg bg-[#F7F5EF] px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-4/5 rounded-lg bg-[#F7F5EF] px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />

          <p className="mt-4 text-sm text-white">
            If you already have an account, please{" "}
            <Link
              to="/login"
              className="text-amber-300 underline hover:text-white transition"
            >
              Login Here
            </Link>
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              type="submit"
              className="
                flex-1 rounded-full bg-teal-900 px-6 py-3
                text-lg font-medium text-white shadow-md
                transition hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-xl
              "
            >
              Register
            </button>
            <Link
              to="/"
              className="
                flex-1 rounded-md bg-amber-400 px-6 py-3
                text-lg text-white text-center shadow-md
                transition hover:-translate-y-1 hover:bg-amber-500 hover:shadow-xl
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

export default RegisterPage;
