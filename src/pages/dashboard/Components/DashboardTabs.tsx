// src/components/DashboardTabs.tsx
import React from 'react';

interface DashboardTabsProps {
  activeTab: 'myBooks' | 'myRentals';
  onTabChange: (tab: 'myBooks' | 'myRentals') => void;
  myBooksCount?: number; // Optional prop for the badge count
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange, myBooksCount }) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      <button
        onClick={() => onTabChange('myBooks')}
        className={`px-4 py-2 text-sm font-semibold ${
          activeTab === 'myBooks'
            ? 'text-purple-600 border-b-2 border-purple-600'
            : 'text-gray-600 hover:text-gray-800'
        } focus:outline-none`}
      >
        My Books
        {myBooksCount !== undefined && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {myBooksCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onTabChange('myRentals')}
        className={`px-4 py-2 text-sm font-semibold ${
          activeTab === 'myRentals'
            ? 'text-purple-600 border-b-2 border-purple-600'
            : 'text-gray-600 hover:text-gray-800'
        } focus:outline-none`}
      >
        My Rentals
      </button>
    </div>
  );
};

export default DashboardTabs;