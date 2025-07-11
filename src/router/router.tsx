import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import BrowsePage from "../pages/browsePage/BrowsePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LendBookPage from "../pages/lendBookPage/LendBookPage";
import LoginPage from "../pages/loginPage/LoginPage";
import MyAccountPage from "../pages/myAccountPage/MyAccountPage";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import BookDetailPage from "../pages/bookDetailPage/BookDetailPage";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    element: <DashboardLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/lend",
            element: <LendBookPage />,
          },
          {
            path: "/account",
            element: <MyAccountPage />,
          },
        ],
      },
      {
        path: "/browse",
        element: <BrowsePage />,
      },
      {
        path: "/bookDetail/:bookId",
        element: <BookDetailPage />,
      },
    ],
  },
]);
