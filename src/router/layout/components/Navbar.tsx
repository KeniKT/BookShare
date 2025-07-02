// src/layout/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import ProfileDropdown from './ProfileDropdown'; // Import the dropdown component

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Get the current location object

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
      {/* Left Section: Navigation Links */}
      <div className="flex items-center space-x-6">
        {/* Browse Link */}
        <Link
          to="/browse"
          className={`relative text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200
            ${isActive('/browse') ? 'text-purple-600 font-bold' : ''}`}
        >
          Browse
          {/* Purple underline for active link */}
          {isActive('/browse') && (
            <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-purple-600 rounded-full"></span>
          )}
        </Link>

        {/* Dashboard Link */}
        <Link
          to="/dashboard"
          className={`relative text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200
            ${isActive('/dashboard') ? 'text-purple-600 font-bold' : ''}`}
        >
          Dashboard
          {/* Purple underline for active link */}
          {isActive('/dashboard') && (
            <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-purple-600 rounded-full"></span>
          )}
        </Link>

        {/* Lend a Book Link */}
        <Link
          to="/lend" // Keeping "/lend" as per your existing href
          className={`relative text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200
            ${isActive('/lend') ? 'text-purple-600 font-bold' : ''}`}
        >
          Lend a Book
          {/* Purple underline for active link */}
          {isActive('/lend') && (
            <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-purple-600 rounded-full"></span>
          )}
        </Link>
      </div>

      {/* Right Section: User Profile */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <img
            src="https://via.placeholder.com/40" // Replace with actual user avatar URL
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        </button>
        {isDropdownOpen && <ProfileDropdown onClose={() => setIsDropdownOpen(false)} />}
      </div>
    </nav>
  );
};

export default Navbar;