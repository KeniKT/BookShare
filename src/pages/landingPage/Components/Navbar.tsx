import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="text-xl font-bold text-indigo-600">📚 BookShare</div>
      <div className="space-x-4">
        <button className="text-gray-700 hover:text-indigo-600" onClick={() => navigate("/login")}>Login</button>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
