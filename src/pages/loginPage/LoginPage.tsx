import React, { useState } from "react";
import { login } from "../../service/auth/login";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     // const result = await login({ email, password });
  //     const result = await fetch(
  //       "https://bookshare-api.onrender.com/api/user/login",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ email, password }),
  //       }
  //     );
  //     // localStorage.setItem('token', result.token);
  //     console.log("Logged in successfully:", result);
  //     // redirect or navigate
  //   } catch (error) {
  //     console.log(error);
  //     setError("Login failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    const result = await fetch(
      "https://bookshare-api.onrender.com/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!result.ok) {
      throw new Error("Login failed");
    }

    const data = await result.json();
    console.log("Logged in successfully:", data);
    // localStorage.setItem('token', data.token);
  } catch (error) {
    console.error(error);
    setError("Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email below to login to your account.
        </p>

        <form method="POST" onSubmit={handleLogin}>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••" // Placeholder for password input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Error message */}
          <div className="text-red-500 text-sm mb-4">{error}</div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
