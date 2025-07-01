import React from "react";

const books = [
  { title: "The Midnight Library", author: "Matt Haig" },
  { title: "Project Hail Mary", author: "Andy Weir" },
  { title: "Sapiens", author: "Yuval Noah Harari" },
  { title: "Where the Crawdads Sing", author: "Delia Owens" },
];

const FeaturedBooks = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Books</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {books.map((book, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="bg-gray-200 h-[300px] mb-4 flex items-center justify-center text-gray-500 text-lg">
              300 × 450
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
