// src/pages/browsePage/components/BookCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  imageUrl?: string;
  title: string;
  author: string;
  description: string;
  status: 'Available' | 'Rented' | 'Requested';
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();

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

  const handleCardClick = () => {
    navigate(`/bookDetail/${book.id}`);
    console.log(`Navigating to book: ${book.title} (ID: ${book.id})`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col w-full max-w-sm sm:max-w-xs"
      onClick={handleCardClick}
    >
      {/* Image section with consistent aspect ratio */}
      <div className="relative w-full aspect-[2/3] bg-gray-100">
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm font-semibold">
            No Image
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold shadow-md ${statusColorClass}`}
        >
          {book.status}
        </span>
      </div>

      {/* Book info */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 truncate">{book.author}</p>
        <p className="text-xs text-gray-500 line-clamp-3">{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
