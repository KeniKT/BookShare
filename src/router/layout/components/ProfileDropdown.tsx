// src/components/ProfileDropdown.tsx
import React, { useEffect, useRef } from "react";

interface ProfileDropdownProps {
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    event.preventDefault(); // Prevent the default <a> tag navigation to /logout

    // 1. Clear any authentication tokens or user data from localStorage
    localStorage.removeItem("authToken"); // Adjust 'authToken' to your actual key
    localStorage.removeItem("userData"); // Adjust 'userData' to your actual key
    // Add more localStorage.removeItem() calls if you store other user-related data

    // 2. Redirect to the landing page by forcing a full page reload
    // This effectively navigates to the root path and resets the application state.
    window.location.href = "/"; // Redirects to your landing page (root path)

    // 3. Close the dropdown
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 z-10"
    >
      <a
        href="/account" // This will cause a full page reload to /my-account
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        My Account
      </a>

      <a
        href="/dashboard" // This will cause a full page reload to /dashboard
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Dashboard
      </a>
      <hr className="my-1 border-gray-200" />
      <a
        href="/" // Set href to root for clarity, though onClick prevents default navigation
        onClick={handleLogout} // Attach the handleLogout function to the click event
        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Logout
      </a>
    </div>
  );
};

export default ProfileDropdown;
