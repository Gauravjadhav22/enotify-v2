import axios from "axios";
import Cookies from "js-cookie"; // Use js-cookie for managing cookies in React

// Create an Axios instance
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Use Vite's `import.meta.env` for environment variables
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Fetch the token from cookies

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add the token to the headers
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
