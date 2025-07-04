import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check for auth token in localStorage
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // re-check on route change

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
      {/* Left Section: Always-visible Links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/browse"
          className={`relative text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 ${
            isActive("/browse") ? "text-purple-600 font-bold" : ""
          }`}
        >
          Browse
          {isActive("/browse") && (
            <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-purple-600 rounded-full"></span>
          )}
        </Link>
        {isLoggedIn && (
          <>
            <Link
              to="/dashboard"
              className={`relative text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 ${
                isActive("/dashboard") ? "text-purple-600 font-bold" : ""
              }`}
            >
              Dashboard
              {isActive("/dashboard") && (
                <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-purple-600 rounded-full"></span>
              )}
            </Link>

            <Link
              to="/lend"
              className={`relative text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 ${
                isActive("/lend") ? "text-purple-600 font-bold" : ""
              }`}
            >
              Lend a Book
              {isActive("/lend") && (
                <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-purple-600 rounded-full"></span>
              )}
            </Link>
          </>
        )}
      </div>

      {/* Right Section: Profile Icon - Only If Logged In */}
      {isLoggedIn ? (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
          </button>
          {isDropdownOpen && (
            <ProfileDropdown onClose={() => setIsDropdownOpen(false)} />
          )}
        </div>
      ) : (
        <div className="px-4">
          <button
            className="text-gray-700 hover:text-indigo-600"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
