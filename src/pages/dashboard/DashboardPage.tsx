// src/pages/dashboard/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import DashboardTabs from './Components/DashboardTabs';
import BookDashboardCard from './Components/BookDashboardCard';
import RentalBookCard from './Components/RentalBookCard';

// -------------------------
// API Endpoints & Helpers
// -------------------------
const API = {
  MY_BOOKS: 'https://bookshare-api.onrender.com/api/book/books/mine/',
  ALL_RENTALS: 'https://bookshare-api.onrender.com/api/rental/rentals/',
  MY_RENTALS: 'https://bookshare-api.onrender.com/api/rental/rentals/mine/',
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
});

// -------------------------
// Types
// -------------------------
interface Book {
  id: string;
  title: string;
  is_available: boolean;
  author: string; // ✅ Added
}

interface Rental {
  id: string | number;
  book: string | number;
  renter: string | number;
  lender?: string | number;
  status: string;
  start_date: string;
  end_date: string;
}

interface BookWithRequests extends Book {
  status: 'Available' | 'Rented'; // ✅ Fixed
  requests: {
    id: string;
    requester: string;
    period: string;
    start_date: string;
    end_date: string;
  }[];
  activeRentalId?: string;
}

interface MappedRental {
  id: string;
  title: string;
  lender: string;
  status: string;
  dueDate: string;
}

// -------------------------
// Dashboard Page
// -------------------------
const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'myBooks' | 'myRentals'>('myBooks');
  const [myBooks, setMyBooks] = useState<BookWithRequests[]>([]);
  const [myRentals, setMyRentals] = useState<MappedRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const booksRes = await fetch(API.MY_BOOKS, { headers: getAuthHeaders() });
        if (!booksRes.ok) throw new Error('Failed to fetch your books.');
        const booksData: Book[] = await booksRes.json();

        const rentalsRes = await fetch(API.ALL_RENTALS, { headers: getAuthHeaders() });
        if (!rentalsRes.ok) throw new Error('Failed to fetch rental requests.');
        const allRentals: Rental[] = await rentalsRes.json();

        const booksWithRequests: BookWithRequests[] = booksData.map((book) => {
          const activeRental = allRentals.find(
            (rental) => rental.book === book.id && rental.status === 'accepted'
          );

          const requests = allRentals
            .filter((rental) => rental.book === book.id && rental.status === 'pending')
            .map((rental) => ({
              id: String(rental.id),
              requester: `User ${rental.renter}`,
              period: `${rental.start_date} to ${rental.end_date}`,
              start_date: rental.start_date,
              end_date: rental.end_date,
            }));

          const status: 'Available' | 'Rented' = book.is_available ? 'Available' : 'Rented';

          return {
            ...book,
            id: String(book.id),
            status,
            requests,
            activeRentalId: activeRental ? String(activeRental.id) : undefined,
          };
        });

        setMyBooks(booksWithRequests);

        const myRentalsRes = await fetch(API.MY_RENTALS, { headers: getAuthHeaders() });
        if (!myRentalsRes.ok) throw new Error('Failed to fetch your rentals.');
        const myRentalsData: Rental[] = await myRentalsRes.json();

        const bookTitleMap = Object.fromEntries(
          booksData.map((book) => [String(book.id), book.title])
        );

        const mappedRentals = myRentalsData.map((rental) => ({
          id: String(rental.id),
          title: bookTitleMap[String(rental.book)] || `Book #${rental.book}`,
          lender: `User ${rental.lender || ''}`,
          status: rental.status,
          dueDate: rental.end_date || '',
        }));

        setMyRentals(mappedRentals);
      } catch (err) {
        console.error(err);
        setError((err as Error).message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <DashboardTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          myBooksCount={myBooks.length}
        />

        {loading ? (
          <div className="text-center text-gray-500 mt-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 mt-8">{error}</div>
        ) : activeTab === 'myBooks' ? (
          <div className="space-y-6 mt-6">
            {myBooks.length > 0 ? (
              myBooks.map((book) => (
                <BookDashboardCard key={book.id} book={book} onEdit={() => {}} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                You don't have any books listed for sharing yet.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="grid grid-cols-4 gap-4 font-semibold text-gray-700 pb-3 border-b border-gray-200">
              <div>Book Title</div>
              <div>Lender</div>
              <div className="text-center">Status</div>
              <div className="text-right pr-2">Due Date</div>
            </div>
            <div className="divide-y divide-gray-100">
              {myRentals.length > 0 ? (
                myRentals.map((rental) => (
                  <RentalBookCard key={rental.id} rental={rental} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  You currently have no borrowed books.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
