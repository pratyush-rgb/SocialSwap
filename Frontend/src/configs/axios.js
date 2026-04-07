import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "http://localhost:3000",
  headers: {
    "Cache-Control": "no-cache", // ADD THIS
  },
});

export default api;
