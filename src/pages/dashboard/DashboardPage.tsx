// src/pages/dashboard/DashboardPage.tsx
import React, { useState } from 'react'; // Import useState
import DashboardTabs from './Components/DashboardTabs';
import BookDashboardCard from './Components/BookDashboardCard';
import StatusBar from './Components/StatusBar';
import RentalBookCard from './Components/RentalBookCard'; // Import the new component

// Mock Data (replace with actual data fetching later)
const mockMyBooks = [ // Renamed from mockBooks for clarity
  {
    id: 'book1',
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    status: "Available",
    requests: [
      { id: 'req1', requester: "John Smith", period: "21 days" },
    ],
  },
  {
    id: 'book2',
    title: "The Midnight Library",
    author: "Matt Haig",
    status: "Available",
    requests: [
      { id: 'req2', requester: "Emily Jones", period: "10 days" },
    ],
  },
];

const mockMyRentals = [ // New mock data for rentals
  {
    id: 'rental1',
    title: "Dune",
    lender: "Emily Jones",
    status: "Confirmed",
    dueDate: "In 14 days",
  },
  {
    id: 'rental2',
    title: "Project Hail Mary",
    lender: "Alex Johnson",
    status: "Pending",
    dueDate: "Waiting approval",
  },
  {
    id: 'rental3',
    title: "To Kill a Mockingbird",
    lender: "Sarah Lee",
    status: "Overdue",
    dueDate: "1 day ago",
  },
];

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'myBooks' | 'myRentals'>('myBooks');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <DashboardTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          myBooksCount={mockMyBooks.length} // Pass the count to the tab component
        />

        {activeTab === 'myBooks' ? (
          <div className="space-y-6 mt-6">
            {mockMyBooks.length > 0 ? (
              mockMyBooks.map((book) => (
                <BookDashboardCard key={book.id} book={book} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">You don't have any books listed for sharing yet.</p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 font-semibold text-gray-700 pb-3 border-b border-gray-200">
              <div>Book Title</div>
              <div>Lender</div>
              <div className="text-center">Status</div>
              <div className="text-right pr-2">Due Date</div>
            </div>
            {/* Rental Books List */}
            <div className="divide-y divide-gray-100">
              {mockMyRentals.length > 0 ? (
                mockMyRentals.map((rental) => (
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