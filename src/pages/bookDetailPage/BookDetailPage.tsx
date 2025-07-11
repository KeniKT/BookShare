// src/pages/bookDetailPage/BookDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Define the type for a Book (matching API fields)
interface Book {
  id: string;
  imageUrl?: string;
  title: string;
  author: string;
  status: 'Available' | 'Rented' | 'Requested';
  lender?: string;
  condition?: string;
  description: string;
  owner?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

const ACCESS_TOKEN = localStorage.getItem('authToken') || '';
const CURRENT_USER_ID = Number(localStorage.getItem('userId'));

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const location = useLocation();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Rental request states
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Try to get book from navigation state first
    const stateBook = location.state?.book;
    if (stateBook) {
      setBook(stateBook);
      setLoading(false);
      return;
    }
    // Otherwise, fetch from API
    if (bookId) {
      setLoading(true);
      setError(null);
      fetch(`https://bookshare-api.onrender.com/api/book/books/${bookId}/`)
        .then((res) => {
          if (!res.ok) throw new Error('Book not found');
          return res.json();
        })
        .then((data) => {
          setBook({
            id: String(data.id),
            imageUrl: data.image,
            title: data.title,
            author: data.author,
            status: data.is_available ? 'Available' : 'Rented',
            lender: data.owner ? `${data.owner.first_name} ${data.owner.last_name} (${data.owner.email})` : 'Unknown',
            condition: data.condition || 'Unknown',
            description: data.description,
            owner: data.owner,
          });
        })
        .catch(() => setError('Book not found!'))
        .finally(() => setLoading(false));
    }
  }, [bookId, location.state]);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading book details...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-600 font-bold text-xl">{error}</div>;
  }

  if (!book) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">No book data available.</div>;
  }

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

  // Check if current user is the owner
  const isOwner = book.owner && book.owner.id === CURRENT_USER_ID;

const handleRequestToRent = () => {
  if (isOwner) {
    setRequestError("You can't request your own book.");
    setTimeout(() => setRequestError(null), 3000);
    return;
  }
  if (book.status !== 'Available') {
    // No error message for rented/requested, just disable button (handled by button logic)
    return;
  }
  setShowRequestForm(true);
  setRequestError(null);
  setRequestSuccess(null);
};

const handleSubmitRequest = async (e: React.FormEvent) => {
  e.preventDefault();
  setRequestLoading(true);
  setRequestError(null);
  setRequestSuccess(null);
  try {
    const res = await fetch('https://bookshare-api.onrender.com/api/rental/rentals/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book: Number(book.id),
        start_date: startDate,
        end_date: endDate,
        message,
      }),
    });
    if (!res.ok) {
      const errData = await res.json();
      // Show API message if status is 400 (e.g. "You cannot rent your own book")
      if (res.status === 400 && errData) {
        setRequestError(errData);
      } else {
        setRequestError(errData || 'Failed to send request');
      }
      return;
    }
    setRequestSuccess('Rental request sent successfully!');
    setShowRequestForm(false);
  } catch (err: any) {
    setRequestError(err.message || 'Failed to send request');
  } finally {
    setRequestLoading(false);
  }
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
              <span>
                Lent by {book.owner?.first_name}
              </span>
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
            {requestSuccess && (
              <div className="mb-4 text-green-600 font-semibold">{requestSuccess}</div>
            )}
            {requestError && (
              <div className="mb-4 text-red-600 font-semibold">{requestError}</div>
            )}
            <button
              onClick={handleRequestToRent}
              className={`w-full md:w-auto py-3 px-6 rounded-md flex items-center justify-center text-lg font-semibold ${
                book.status === 'Available' && !isOwner
                  ? 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              disabled={requestLoading || isOwner || book.status !== 'Available'}
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M7 16h.01M17 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {isOwner
                ? "Your Book"
                : book.status === "Rented"
                  ? "Rented"
                  : "Request to Rent"}
            </button>
            {/* Only show form if available and not owner */}
            {showRequestForm && book.status === 'Available' && !isOwner && (
              <form onSubmit={handleSubmitRequest} className="bg-purple-50 p-4 rounded-lg mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    rows={2}
                    placeholder="Add a message to the lender"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    disabled={requestLoading}
                  >
                    {requestLoading ? 'Sending...' : 'Send Request'}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    onClick={() => setShowRequestForm(false)}
                    disabled={requestLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailPage;
