// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './component/Login/LoginPage';
import UserHomePage from './component/Home/UserHomePage';
import AdminHomePage from './component/Admin/AdminHomePage';
import AddUserPage from './component/Admin/AddUserPage.jsx';
import Navbar from './component/Header/Navbar';
import UpdateUserPage from './component/Admin/UpdateUserPage.jsx';
import AddBookPage from './component/Admin/AddBookPage.jsx';
import UpdateBookPage from './component/Admin/UpdateBookPage.jsx';
import AllUsersPage from './component/Admin/AllUsersPage.jsx';
import AllBooksPage from './component/Admin/AllBooksPage.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/admin/add-user" element={<AddUserPage />} />
        <Route path="/admin/update-user/:userId" element={<UpdateUserPage />} />
        <Route path="/admin/add-book" element={<AddBookPage />} />
        <Route path="/admin/update-book/:bookId" element={<UpdateBookPage />} />
        <Route path="/admin/all-users" element={<AllUsersPage />} />
        <Route path="/admin/all-books" element={<AllBooksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
