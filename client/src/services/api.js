import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for global error handling and user feedback
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error (no response from server)
    if (!error.response) {
      toast.error("🌐 Network error. Please check your connection.");
      return Promise.reject(error);
    }

    // Server error responses with user-friendly messages
    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem("token");
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          toast.error("🔐 Session expired. Please login again.");
          window.location.href = "/login";
        }
        break;

      case 403:
        toast.error("🚫 Access forbidden. You don't have permission.");
        break;

      case 404:
        toast.error("🔍 Resource not found.");
        break;

      case 422:
        // Validation errors
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((err) => toast.error(`⚠️ ${err}`));
        } else {
          toast.error(`⚠️ ${data.message || "Validation error"}`);
        }
        break;

      case 429:
        toast.error("⏰ Too many requests. Please try again later.");
        break;

      case 500:
        toast.error("🔧 Server error. Please try again later.");
        break;

      default:
        // Generic error handling for unexpected status codes
        const message = data?.message || `Request failed with status ${status}`;
        toast.error(`❌ ${message}`);
    }

    return Promise.reject(error);
  }
);

// Authentication API endpoints
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),
  getProfile: () => api.get("/auth/profile"),
};

// Task management API endpoints
export const taskAPI = {
  getTasks: (params) => api.get("/tasks", { params }), // Supports filtering/sorting
  createTask: (task) => api.post("/tasks", task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;
