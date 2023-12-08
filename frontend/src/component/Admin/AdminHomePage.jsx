// src/components/Admin/AdminHomePage.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminHomePage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            await axios.get('http://localhost:4000/api/logout');

            // Redirecting to the login page
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 rounded shadow-md w-96 text-black">
                <h2 className="text-2xl font-semibold mb-4">Admin Home Page</h2>

                {/* Navigation links for managing users and books */}
                <nav className="mb-4">
                    <ul>
                        <li>
                            <Link to="/admin/add-user" className="text-blue-500 hover:underline">
                                Add User
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/add-book" className="text-blue-500 hover:underline">
                                Add Book
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/all-users" className="text-blue-500 hover:underline">
                                All Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/all-books" className="text-blue-500 hover:underline">
                                All Books
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Logout option in the top-right corner */}
                <div className="absolute top-4 right-10">
                    <button
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
