import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "../../context/AuthContext";

function DashboardLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
