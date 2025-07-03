// src/components/RentalBookCard.tsx
import React from 'react';

interface RentalBook {
  id: string;
  title: string;
  lender: string;
  status: string; // e.g., "Confirmed", "Pending", "Overdue"
  dueDate: string; // e.g., "In 14 days", "2025-07-15"
}

interface RentalBookCardProps {
  rental: RentalBook;
}

const RentalBookCard: React.FC<RentalBookCardProps> = ({ rental }) => {
  // Determine status color
  let statusColorClass = '';
  switch (rental.status.toLowerCase()) {
    case 'confirmed':
    case 'accepted':
      statusColorClass = 'bg-green-100 text-green-800';
      break;
    case 'pending':
      statusColorClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'declined':
    case 'overdue':
      statusColorClass = 'bg-red-100 text-red-800';
      break;
    default:
      statusColorClass = 'bg-gray-100 text-gray-800';
  }

  return (
    <div className="grid grid-cols-4 gap-4 items-center py-3 border-b border-gray-200 last:border-b-0">
      {/* Book Title */}
      <div className="text-gray-800 font-medium">{rental.title}</div>

      {/* Lender */}
      <div className="text-gray-600">{rental.lender}</div>

      {/* Status */}
      <div className="flex justify-center">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColorClass}`}>
          {rental.status}
        </span>
      </div>

      {/* Due Date */}
      <div className="text-gray-600 text-right pr-2">{rental.dueDate}</div>
    </div>
  );
};

export default RentalBookCard;
