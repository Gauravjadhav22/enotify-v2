import axios from "axios";
import { parse } from "cookie"; // Install with: npm install cookie

/**
 * Returns an Axios instance configured with the token extracted from cookies.
 * @param req - The incoming server request.
 * @returns A configured Axios instance.
 */
export function getServerAxiosClient(req: Request) {
  // Extract cookies from the request headers
  const cookies = req.headers.get("cookie") || ""; // Default to an empty string if no cookies are present
  const parsedCookies = parse(cookies); // Parse the cookies into a key-value object

  const token = parsedCookies["token"]; // Retrieve the "token" cookie

  console.log("Token:", token); // Log the token for debugging

  // Create and return the Axios client with the token in the Authorization header
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Vite's syntax for accessing environment variables
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Include the token if available
    },
  });
}
