import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="text-center py-20 px-4 bg-gray-100">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BookShare</h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-6">
        Your community library, Lend books you love, discover new Books, and connect with fellow readers.
      </p>
      <div className="space-x-4">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-md" onClick={() => navigate("/signup")}>Get Started</button>
        <button className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-200" onClick={() => navigate("/browse")}>Browse Books</button>
      </div>
    </section>
  );
};

export default HeroSection;
