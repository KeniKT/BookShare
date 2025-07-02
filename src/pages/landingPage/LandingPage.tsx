import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import HowItWorks from "./Components/HowItWorks";
import FeaturedBooks from "./Components/FeaturedBooks";
import Footer from "./Components/Footer";

const LandingPage: React.FC = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://bookshare-api.onrender.com/api/book/books/")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setBooks([]));
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturedBooks books={books} />
      <Footer />
    </div>
  );
};

export default LandingPage;
