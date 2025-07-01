// src/components/RequestRow.tsx
import React from 'react';

interface Request {
  id: string;
  requester: string;
  period: string;
}

interface RequestRowProps {
  request: Request;
}

const RequestRow: React.FC<RequestRowProps> = ({ request }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
      <div className="flex-1">
        <p className="text-gray-800 font-medium">{request.requester}</p>
        <p className="text-gray-600 text-sm">{request.period}</p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          className="text-green-600 hover:text-green-800 focus:outline-none"
          title="Approve Request"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
        <button
          className="text-red-600 hover:text-red-800 focus:outline-none"
          title="Reject Request"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RequestRow;