// src/components/ProfileDropdown.tsx
import React, { useEffect, useRef } from 'react';

interface ProfileDropdownProps {
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 z-10"
    >
      <a
        href="/account"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        My Account
      </a>
    
      <a
        href="/dashboard"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Dashboard
      </a>
      <hr className="my-1 border-gray-200" />
      <a
        href="/logout"
        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Logout
      </a>
    </div>
  );
};

export default ProfileDropdown;