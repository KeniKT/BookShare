// src/pages/browsePage/BrowsePage.tsx
import React, { useEffect, useState } from 'react';

// Importing the new, local components from the 'components' subfolder
import StatusBar from './components/StatusBar';
import BookCard from './components/BookCard';

// Define the type for a book from the API
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  condition: string;
  is_available: boolean;
  created_at: string;
  image: string;
}

const BrowsePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://bookshare-api.onrender.com/api/book/books/');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Browse Books</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={{
                  id: String(book.id),
                  imageUrl: book.image, // Pass as imageUrl for BookCard
                  title: book.title,
                  author: book.author,
                  description: book.description,
                  status: book.is_available ? 'Available' : 'Rented',
                }}
              />
            ))}
          </div>
        )}
      </main>

      <StatusBar issuesCount={3} /> {/* Local StatusBar for BrowsePage */}
    </div>
  );
};

export default BrowsePage;
