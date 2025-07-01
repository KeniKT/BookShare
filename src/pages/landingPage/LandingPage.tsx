import React from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import HowItWorks from "./Components/HowItWorks";
import FeaturedBooks from "./Components/FeaturedBooks";
import Footer from "./Components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturedBooks />
      <Footer />
    </div>
  );
};

export default LandingPage;
