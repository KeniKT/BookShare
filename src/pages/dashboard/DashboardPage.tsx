// src/pages/dashboard/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import DashboardTabs from './Components/DashboardTabs';
import BookDashboardCard from './Components/BookDashboardCard';
import StatusBar from './Components/StatusBar';
import RentalBookCard from './Components/RentalBookCard';

const BOOKS_API = 'https://bookshare-api.onrender.com/api/book/books/mine/';
const RENTALS_API = 'https://bookshare-api.onrender.com/api/rental/rentals/';
const MY_RENTALS_API = 'https://bookshare-api.onrender.com/api/rental/rentals/mine/';
const ACCESS_TOKEN = localStorage.getItem('authToken') || '';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'myBooks' | 'myRentals'>('myBooks');
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [myRentals, setMyRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch my books
        const booksRes = await fetch(BOOKS_API, {
          headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
        });
        if (!booksRes.ok) throw new Error('Failed to fetch books');
        const booksData = await booksRes.json();
        // Fetch all rental requests
        const requestsRes = await fetch(RENTALS_API, {
          headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
        });
        if (!requestsRes.ok) throw new Error('Failed to fetch rental requests');
        const requestsData = await requestsRes.json();
        // Attach requests to each book
        const booksWithRequests = booksData.map((book: any) => ({
          ...book,
          id: String(book.id),
          status: book.is_available ? 'Available' : 'Rented',
          requests: requestsData.filter((req: any) => req.book === book.id && req.status === 'pending').map((req: any) => ({
            id: String(req.id),
            requester: `User ${req.renter}`,
            period: `${req.start_date} to ${req.end_date}`,
            start_date: req.start_date,
            end_date: req.end_date,
          })),
        }));
        setMyBooks(booksWithRequests);
        // Fetch my rentals
        const myRentalsRes = await fetch(MY_RENTALS_API, {
          headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
        });
        if (!myRentalsRes.ok) throw new Error('Failed to fetch my rentals');
        const myRentalsData = await myRentalsRes.json();
        // Map rentals for RentalBookCard
        // Build a map of bookId to book title for quick lookup
        const bookIdToTitle: Record<string, string> = {};
        booksData.forEach((book: any) => {
          bookIdToTitle[String(book.id)] = book.title;
        });
        const mappedRentals = myRentalsData.map((rental: any) => ({
          id: String(rental.id),
          title: bookIdToTitle[String(rental.book)] || `Book #${rental.book}`,
          lender: `User ${rental.lender || ''}`,
          status: rental.status,
          dueDate: rental.end_date || '',
        }));
        setMyRentals(mappedRentals);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
              <p className="text-gray-500 text-center py-8">You don't have any books listed for sharing yet.</p>
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
                <p className="text-gray-500 text-center py-8">You currently have no borrowed books.</p>
              )}
            </div>
          </div>
        )}
      </main>
      <StatusBar issuesCount={3} />
    </div>
  );
};

export default DashboardPage;
