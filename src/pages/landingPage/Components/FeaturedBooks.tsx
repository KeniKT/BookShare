import React from "react";

interface Book {
  title: string;
  author: string;
  image?: string;
}

const FeaturedBooks: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Books</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {books.slice(0, 4).map((book, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="bg-gray-200 h-[300px] mb-4 flex items-center justify-center text-gray-500 text-lg rounded overflow-hidden">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="object-cover w-full h-full max-h-[300px] max-w-[300px] mx-auto"
                  style={{ aspectRatio: '2/3' }}
                />
              ) : (
                <span className="text-gray-400">300 × 450</span>
              )}
            </div>
            <div className="font-semibold">{book.title}</div>
            <div className="text-sm text-gray-500">{book.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;
