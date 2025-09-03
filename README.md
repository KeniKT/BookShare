# BookShare

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
  - [User Authentication](#user-authentication)
  - [Book Management](#book-management)
  - [Book Browsing and Rental](#book-browsing-and-rental)
  - [User Dashboard](#user-dashboard)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation and Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
  - [For Users](#for-users)
  - [For Developers](#for-developers)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Description

BookShare is a web application designed to facilitate the sharing and renting of books among users. It provides a platform where users can list their books for lending, browse available books from other users, request to rent books, and manage their personal book collection and rental activities.

---

## Features

### User Authentication
- **Sign Up:** New users can create an account by providing their first name, last name, email, and password.
- **Login:** Registered users can log in using their email and password.

### Book Management
- **Lend a Book:** Users can add new books to their collection by providing details such as title, author, description, condition, and an image. Books are marked as available for lending.
- **My Books (Dashboard):** Users can view a list of books they have listed for sharing. They can see the status of their books (Available/Rented) and manage rental requests.

### Book Browsing and Rental
- **Browse Books:** Users can browse a comprehensive list of all available books on the platform, even without logging in.
- **Book Detail Page:** Each book has a dedicated detail page displaying its title, author, description, condition, and lender information. Users can request to rent available books from this page.
- **My Rentals (Dashboard):** Users can view a list of books they have borrowed, including the lender's information, status, and due date.

### User Dashboard
- The dashboard provides an overview of a user's listed books and borrowed books, with separate tabs for easy navigation.

---

## Technologies Used

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **React Router DOM:** For declarative routing in React applications.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Vite:** A fast build tool that provides a lightning-fast development experience.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

### Backend
- The application interacts with a Django-based backend API hosted at `https://bookshare-api.onrender.com`.
  - User authentication (signup, login)
  - Book management (listing, viewing, image upload)
  - Rental management (requesting, viewing rentals)

---

## Installation and Setup

To set up and run the BookShare project locally, follow these steps:

### Prerequisites
- Node.js (LTS version recommended)
- npm or Yarn

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd BookShare
