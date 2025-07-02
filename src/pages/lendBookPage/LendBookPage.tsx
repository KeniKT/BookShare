// src/pages/lendBookPage/LendBookPage.tsx
import React, { useState } from 'react';
import StatusBar from './components/StatusBar';

const LendBookPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({ title, author, description, condition });
    alert('Book details submitted! (Check console for data)');
    // Optionally clear form or redirect
    setTitle('');
    setAuthor('');
    setDescription('');
    setCondition('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <main className="flex-1 p-6 flex items-start justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mt-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Lend a New Book</h2>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Fill out the details below to add your book to ShareShelf. Our AI can help you write a great description!
          </p>

          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-blue-50"
                placeholder="The Hitchhiker's Guide to the Galaxy"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Author Input */}
            <div className="mb-4">
              <label htmlFor="author" className="block text-gray-700 text-sm font-semibold mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-blue-50"
                placeholder="Douglas Adams"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            {/* Description Textarea */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                placeholder="Tell us a little bit about the book"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Condition Dropdown */}
            <div className="mb-6">
              <label htmlFor="condition" className="block text-gray-700 text-sm font-semibold mb-2">
                Condition
              </label>
              <select
                id="condition"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              >
                <option value="" disabled>Select the book's condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            {/* Add Book Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add Book to Shelf
            </button>
          </form>
        </div>
      </main>

      <StatusBar issuesCount={3} /> {/* This is the new local StatusBar */}
    </div>
  );
};

export default LendBookPage;