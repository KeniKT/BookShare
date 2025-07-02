// src/pages/browsePage/components/BookCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Book {
  id: string;
  imageUrl?: string; // Optional image URL
  title: string;
  author: string;
  description: string;
  status: 'Available' | 'Rented' | 'Requested';
}

interface BookCardProps {
  book: Book;
  // onClick prop is no longer strictly needed for navigation if we use useNavigate directly
  // onClick?: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book /*, onClick */ }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    // Navigate to the BookDetail page using the book's ID
    // We'll define a route like '/books/:bookId' for this.
    navigate(`/bookDetail/${book.id}`); // This is the key change!
    console.log(`Navigating to book: ${book.title} (ID: ${book.id})`);
    // The previous onClick prop logic is replaced by direct navigation
    // if (onClick) {
    //   onClick(book.id);
    // }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow duration-200 w-[250px] h-[500px] flex flex-col"
      onClick={handleCardClick}
    >
      {/* Book Image Placeholder */}
      <div className="w-full h-[350px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold overflow-hidden">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <span>300 x 450</span>
        )}
      </div>

      {/* Status Badge - POSITIONED ON TOP RIGHT */}
      <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${statusColorClass}`}>
        {book.status}
      </span>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-1">{book.author}</p>
        <p className="text-gray-500 text-xs line-clamp-3 flex-1">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
