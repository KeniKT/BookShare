// src/pages/dashboard/components/BookDashboardCard.tsx
import React, { useState } from 'react';

// Define the Book and Request interfaces (consistent with DashboardPage)
interface Request {
  id: string;
  requester: string;
  period: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'Available' | 'Rented' | 'Requested';
  requests?: Request[];
  description?: string; // Add description to the type
  condition?: string; // Add condition to the type
}

interface BookDashboardCardProps {
  book: Book;
  onEdit: (book: Book) => void; // New prop: function to call when Edit is clicked
}

const BookDashboardCard: React.FC<BookDashboardCardProps> = ({ book, onEdit }) => {
  const [showRequests, setShowRequests] = useState(false);

  let statusColorClass = '';
  switch (book.status) {
    case 'Available':
      statusColorClass = 'bg-green-500 text-white';
      break;
    case 'Rented':
      statusColorClass = 'bg-yellow-500 text-white';
      break;
    case 'Requested':
      statusColorClass = 'bg-blue-500 text-white';
      break;
    default:
      statusColorClass = 'bg-gray-500 text-white';
  }

  const handleApprove = (requestId: string) => {
    alert(`Approved request ${requestId} for ${book.title}`);
    // Implement actual approval logic (e.g., API call)
  };

  const handleReject = (requestId: string) => {
    alert(`Rejected request ${requestId} for ${book.title}`);
    // Implement actual rejection logic (e.g., API call)
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        {/* Book Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
          <p className="text-gray-600 text-sm">{book.author}</p>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center space-x-4">
          {/* Status Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColorClass}`}>
            {book.status}
          </span>

          {/* Request Button */}
          {book.requests && book.requests.length > 0 && (
            <button
              onClick={() => setShowRequests(!showRequests)}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              {book.requests.length} Request{book.requests.length > 1 ? 's' : ''}
            </button>
          )}

          {/* Edit Button */}
          <button
            onClick={() => onEdit(book)} // Call the onEdit prop, passing the book
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Edit
          </button>

          {/* Dropdown Arrow (if you want to implement more actions) */}
          <button
            onClick={() => {/* More actions logic */}}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Incoming Requests Section (if applicable) */}
      {showRequests && book.requests && book.requests.length > 0 && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-3">Incoming Rental Requests</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested by
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {book.requests.map(request => (
                  <tr key={request.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                      {request.requester}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                      {request.period}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDashboardCard;