// src/pages/lendBookPage/LendBookPage.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://bookshare-api.onrender.com/api/book/books/';
const ACCESS_TOKEN = localStorage.getItem('authToken') || '';

const LendBookPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!imageFile) {
      setError('Book image is required.');
      return;
    }
    setLoading(true);
    try {
      // 1. Submit book details
      const bookRes = await fetch(API_URL, {
        method: 'POST',
        headers:
        {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          description,
          condition,
          is_available: true,
        }),
      });
      if (!bookRes.ok) throw new Error('Failed to submit book details');
      const bookData = await bookRes.json();
      const bookId = bookData.id;
      // 2. Submit image (required)
      const formData = new FormData();
      formData.append('image', imageFile);
      const imageRes = await fetch(`${API_URL}${bookId}/upload-image/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: formData,
      });
      if (!imageRes.ok) throw new Error('Failed to upload book image');
      setSuccess('Book successfully added! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-6 flex items-start justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mt-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Lend a New Book</h2>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Fill out the details below to add your book to ShareShelf. Our AI can help you write a great description!
          </p>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-600 text-center mb-4">{success}</div>}
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
            <div className="mb-4">
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
                <option value="like_new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            {/* Image Upload - Drag and Drop */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Book Image <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer transition-colors ${imageFile ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'} hover:border-purple-400`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                style={{ minHeight: 120 }}
              >
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img src={imagePreview} alt="Preview" className="max-h-32 mb-2 rounded shadow" />
                    <button type="button" onClick={handleRemoveImage} className="text-xs text-red-600 underline">Remove</button>
                  </div>
                ) : (
                  <>
                    <span className="text-gray-500 mb-2">Drag & drop or click to select an image</span>
                    <span className="text-xs text-gray-400">(JPG, PNG, etc. required)</span>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Book to Shelf'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LendBookPage;
