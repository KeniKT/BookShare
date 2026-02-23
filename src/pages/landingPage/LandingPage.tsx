// src/pages/landingPage/LandingPage.tsx
import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import HowItWorks from "./Components/HowItWorks";
import FeaturedBooks from "./Components/FeaturedBooks";
import Footer from "./Components/Footer";

const LandingPage: React.FC = () => {
  const [books, setBooks] = useState([]);

  // Inject Google Fonts once
  useEffect(() => {
    const existing = document.getElementById("bookshare-fonts");
    if (!existing) {
      const link = document.createElement("link");
      link.id = "bookshare-fonts";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=DM+Sans:wght@400;500;600;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  // Real API fetch — unchanged from your original
  useEffect(() => {
    fetch("https://bookshare-api.onrender.com/api/book/books/")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setBooks([]));
  }, []);

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#072743",
      color: "#e2e8f0",
      minHeight: "100vh",
    }}>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturedBooks books={books} />
      <Footer />
    </div>
  );
};

export default LandingPage;