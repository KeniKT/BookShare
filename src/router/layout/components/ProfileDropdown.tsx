// src/components/ProfileDropdown.tsx
import React, { useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

interface ProfileDropdownProps {
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { removeAuthenticated } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Function to handle logout
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // prevent default navigation
    event.stopPropagation(); // Prevent the default <a> tag navigation to /logout

    // 1. Clear any authentication tokens or user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    removeAuthenticated();
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 z-10"
    >
      <Link
        to="/account" // This will cause a full page reload to /my-account
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        My Account
      </Link>

      <Link
        to="/dashboard" // This will cause a full page reload to /dashboard
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Dashboard
      </Link>
      <hr className="my-1 border-gray-200" />
      <Link
        to="/login" // Set href to root for clarity, though onClick prevents default navigation
        onClick={handleLogout} // Attach the handleLogout function to the click event
        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Logout
      </Link>
    </div>
  );
};

export default ProfileDropdown;
