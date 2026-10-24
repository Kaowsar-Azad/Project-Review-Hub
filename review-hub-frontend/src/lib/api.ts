import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.id) {
          config.headers["x-user-id"] = user.id;
          config.headers["x-user-role"] = user.role || "STUDENT";
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }
  return config;
});
