// src/pages/signUpPage/SignUpPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const SignUpPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    setLoading(true);
    setError(null);
    setSuccess(null);

    // Define your Django backend base URL
    // IMPORTANT: Replace with your actual Django backend URL (e.g., 'http://localhost:8000')
    const API_BASE_URL = 'https://bookshare-api.onrender.com'; // <<< CHANGE THIS TO YOUR DJANGO BACKEND URL

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName, // Django often expects snake_case for fields
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      if (response.ok) { // Check if the response status is 2xx (success)
        const data = await response.json();
        setSuccess('Account created successfully! Redirecting to login...');
        console.log('Signup successful:', data);
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle API errors (e.g., validation errors from Django)
        const errorData = await response.json();
        console.error('Signup failed:', errorData);

        // Display specific error messages from Django
        if (errorData.email) {
          setError(`Email: ${errorData.email.join(', ')}`);
        } else if (errorData.password) {
          setError(`Password: ${errorData.password.join(', ')}`);
        } else if (errorData.detail) { // Generic error from Django REST Framework
          setError(errorData.detail);
        } else {
          setError('Signup failed. Please check your input.');
        }
      }
    } catch (err) {
      console.error('Network or unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-gray-600 text-center mb-6">Create your account to start sharing and borrowing.</p>

        <form onSubmit={handleSubmit}>
          {/* First Name Input */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName" // Add name attribute for consistency
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-blue-50"
              placeholder="Max"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName" // Add name attribute
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-blue-50"
              placeholder="Robinson"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email" // Add name attribute
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-blue-50"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" // Add name attribute
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          {/* Create account Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;