// src/pages/browsePage/BrowsePage.tsx
import React from 'react';

// Importing the new, local components from the 'components' subfolder
import Navbar from './components/Navbar';
import StatusBar from './components/StatusBar';
import BookCard from './components/BookCard';

// Mock Data for Browse Books
const mockBooks = [
  {
    id: 'browse-book1',
    imageUrl: 'https://via.placeholder.com/300x450/AEC6CF/FFFFFF?text=Book+Cover+1', // Example placeholder
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    description: "Arthur Dent's ordinary day turns extraordinary when Earth is demolished to make way for a hyperspace bypass. He embarks on an absurd journey through space with his alien friend Ford Prefect, armed with nothing but a towel and a guidebook.",
    status: 'Available' as const, // Use 'as const' for literal type
  },
  {
    id: 'browse-book2',
    imageUrl: 'https://via.placeholder.com/300x450/B3E0C0/FFFFFF?text=Book+Cover+2',
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "Ryland Grace is the sole survivor on a desperate mission to save humanity, but he can't remember who he is or why he's there. He must piece together his identity and complete his task before it's too late.",
    status: 'Available' as const,
  },
  {
    id: 'browse-book3',
    imageUrl: 'https://via.placeholder.com/300x450/D0D0FF/FFFFFF?text=Book+Cover+3',
    title: "Dune",
    author: "Frank Herbert",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He is propelled into a destiny beyond his understanding, facing betrayal, mysticism, and a unique ecological system.",
    status: 'Rented' as const,
  },
  {
    id: 'browse-book4',
    imageUrl: 'https://via.placeholder.com/300x450/FFFACD/FFFFFF?text=Book+Cover+4',
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library, and within that library, the shelves go on for ever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
    status: 'Available' as const,
  },
  {
    id: 'browse-book5',
    imageUrl: 'https://via.placeholder.com/300x450/C8E6C9/FFFFFF?text=Book+Cover+5',
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    description: "A novel that looks at our changing world through the innocent eyes of an unforgettable Artificial Friend, Klara, who observes the behavior of human beings and tries to understand their complex emotions.",
    status: 'Available' as const,
  },
  {
    id: 'browse-book6',
    imageUrl: 'https://via.placeholder.com/300x450/FFD9C0/FFFFFF?text=Book+Cover+6',
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy and proven way to build good habits and break bad ones. This book distills the best ideas from various fields into simple, actionable strategies for building better habits.",
    status: 'Available' as const,
  },
];

const BrowsePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Browse Books</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>

      <StatusBar issuesCount={3} /> {/* Local StatusBar for BrowsePage */}
    </div>
  );
};

export default BrowsePage;