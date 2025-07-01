import React from "react";

const features = [
  {
    title: "Discover & Borrow",
    description: "Browse a vast collection of books shared by your local community and borrow with a simple request.",
    icon: "📖",
  },
  {
    title: "Share Your Shelf",
    description: "List your own books, manage rental requests, and give your books a new life.",
    icon: "🔗",
  },
  {
    title: "Connect with Readers",
    description: "Join a community of book lovers, see what others are reading, and share your thoughts.",
    icon: "👥",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((f, index) => (
          <div key={index} className="text-center">
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
