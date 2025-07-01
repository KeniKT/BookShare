// src/components/StatusBar.tsx
import React, { useState } from 'react';

interface StatusBarProps {
  issuesCount: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ issuesCount }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-3 flex items-center justify-between text-sm shadow-lg">
      <div className="flex items-center">
        <span className="font-bold mr-2">{issuesCount} Issues</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-white hover:text-gray-200 focus:outline-none ml-4"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default StatusBar;