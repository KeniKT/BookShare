// src/components/Navbar.tsx
import React, { useState } from 'react';
import ProfileDropdown from './ProfileDropdown'; // Import the dropdown component

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
      {/* Left Section: Navigation Links */}
      <div className="flex items-center space-x-6">
        <a href="/browse" className="text-gray-700 hover:text-gray-900 font-semibold">Browse</a>
        <a href="/dashboard" className="text-gray-900 font-bold border-b-2 border-purple-600 pb-1">Dashboard</a>
        <a href="/lend" className="text-gray-700 hover:text-gray-900 font-semibold">Lend a Book</a>
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