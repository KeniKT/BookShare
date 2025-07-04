// src/pages/loginPage/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Initialize as null
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    // IMPORTANT: Ensure this URL is correct for your Django login endpoint
    const API_LOGIN_URL = "https://bookshare-api.onrender.com/api/user/login/";

    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) { // Check if the response status is 2xx (success)
        const data = await response.json();

        // Assuming your Django backend returns a token like this: { "token": "your_auth_token" }
        if (data.access) {
          localStorage.setItem('authToken', data.access); // Store the token securely
          // Redirect to a protected page, e.g., '/dashboard' or '/browse'
          navigate('/dashboard'); // Or '/browse', depending on your desired post-login page
        } else {
          // If no token is returned but response.ok is true, something is unexpected
          setError("Login successful, but no authentication token received.");
        }
      } else {
        // Handle API errors (e.g., invalid credentials from Django)
        const errorData = await response.json();
        console.error("Login failed:", errorData);

        // Display specific error messages from Django
        if (errorData.detail) { // Common for invalid credentials in DRF
          setError(errorData.detail);
        } else if (errorData.non_field_errors) { // Another common DRF error type
            setError(errorData.non_field_errors.join(', '));
        } else {
          // Fallback for other error structures
          setError(Object.values(errorData).flat().join(', ') || 'Login failed. Please check your credentials.');
        }
      }
    } catch (err) {
      console.error("Network or unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email below to login to your account.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email" // Add name attribute
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-blue-50" // Changed focus ring to purple
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" // Add name attribute
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" // Changed focus ring to purple
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-gray-600 text-sm mt-6">
          You can browse books without sign in.{" "}
          <Link to="/browse" className="text-purple-600 hover:underline">
            Browse
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;