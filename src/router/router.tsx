import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import BrowsePage from "../pages/browsePage/BrowsePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LendBookPage from "../pages/lendBookPage/LendBookPage";
import LoginPage from "../pages/loginPage/LoginPage";
import MyAccountPage from "../pages/myAccountPage/MyAccountPage";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import BookDetailPage from "../pages/bookDetailPage/BookDetailPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
        children: []
    },
        {
        path: '/dashboard',
        element: <DashboardPage />,
        children: []
    },    {
        path: '/browse',
        element: <BrowsePage />,
        children: []
    },    {
        path: '/lend',
        element: <LendBookPage />,
        children: []
    },    {
        path: '/login',
        element: <LoginPage />,
        children: []
    },    {
        path: '/account',
        element: <MyAccountPage />,
        children: []
    },    {
        path: '/signup',
        element: <SignUpPage />,
        children: []
    },
    {
        path: '/bookDetail/:bookId',
        element: <BookDetailPage />,
        children: []
    },

])