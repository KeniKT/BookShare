// src/pages/bookDetailPage/BookDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

// Importing the new, local components from the 'components' subfolder
import StatusBar from './components/StatusBar';

// Define the type for a Book (matching your mock data structure)
interface Book {
  id: string;
  imageUrl?: string;
  title: string;
  author: string;
  status: 'Available' | 'Rented' | 'Requested';
  lender: string;
  condition: string;
  description: string;
}

// Mock Book Data Array (to simulate fetching a specific book by ID)
const allMockBooks: Book[] = [
  {
    id: 'book123', // This ID should match the one used in `BookCard.tsx` for navigation
    imageUrl: 'https://via.placeholder.com/300x450/C0C0C0/FFFFFF?text=Book+Cover',
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    status: 'Available',
    lender: 'Jane Doe',
    condition: 'Good',
    description: "A hilarious science fiction adventure following the last surviving man from Earth, Arthur Dent, as he travels through space with his alien friend Ford Prefect. Written with dry wit and philosophical absurdity, it's a must-read for fans of satirical science fiction.",
  },
  {
    id: 'browse-book2', // Example: An ID from your BrowsePage mock data
    imageUrl: 'https://via.placeholder.com/300x450/B3E0C0/FFFFFF?text=Book+Cover+2',
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "Ryland Grace is the sole survivor on a desperate mission to save humanity, but he can't remember who he is or why he's there. He must piece together his identity and complete his task before it's too late.",
    status: 'Available',
    lender: 'Alice Smith',
    condition: 'Like New',
  },
  {
    id: 'browse-book3', // Example: An ID from your BrowsePage mock data
    imageUrl: 'https://via.placeholder.com/300x450/D0D0FF/FFFFFF?text=Book+Cover+3',
    title: "Dune",
    author: "Frank Herbert",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He is propelled into a destiny beyond his understanding, facing betrayal, mysticism, and a unique ecological system.",
    status: 'Rented',
    lender: 'Bob Johnson',
    condition: 'Good',
  },
  // ... add other books from your BrowsePage mock data here with unique IDs
];

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>(); // Get the bookId from the URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId) {
      setLoading(true);
      setError(null);
      // Simulate API call to fetch book details by ID
      const fetchedBook = allMockBooks.find(b => b.id === bookId);
      if (fetchedBook) {
        setBook(fetchedBook);
      } else {
        setError('Book not found!');
      }
      setLoading(false);
    }
  }, [bookId]); // Re-run effect if bookId changes

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading book details...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-600 font-bold text-xl">{error}</div>;
  }

  if (!book) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">No book data available.</div>;
  }

  // Determine status badge color for the displayed book
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

  const handleRequestToRent = () => {
    alert(`Requesting to rent "${book.title}"! (Logic to be implemented)`);
    // In a real application, you would send a request to your backend here.
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-6 flex items-start justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mt-8 flex flex-col md:flex-row">
          {/* Left Section: Book Image */}
          <div className="w-full md:w-1/3 flex-shrink-0 mb-6 md:mb-0 md:mr-8 relative">
            <img
              src={book.imageUrl || 'https://via.placeholder.com/300x450/C0C0C0/FFFFFF?text=No+Cover'}
              alt={book.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
            {/* Status Badge - Positioned on Top Right of the image */}
            <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${statusColorClass}`}>
              {book.status}
            </span>
          </div>

          {/* Right Section: Book Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-gray-600 text-lg mb-4">by {book.author}</p>

            <div className="flex items-center text-gray-500 text-sm mb-4">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
              <span>Lent by {book.lender}</span>
              <span className="mx-2">•</span>
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm1.447 1.553a1 1 0 011.414 0L10 9.172l4.139-4.139a1 1 0 111.414 1.414L11.414 10l4.139 4.139a1 1 0 01-1.414 1.414L10 11.414l-4.139 4.139a1 1 0 01-1.414-1.414L8.586 10 4.447 5.861a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span>Condition: {book.condition}</span>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {book.description}
            </p>

            <button
              onClick={handleRequestToRent}
              className="w-full md:w-auto bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center text-lg font-semibold"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M7 16h.01M17 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Request to Rent
            </button>
          </div>
        </div>
      </main>

      <StatusBar /> {/* Local StatusBar for BookDetailPage */}
    </div>
  );
};

export default BookDetailPage;