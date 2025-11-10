import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://yourbackend.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});



export default API;
