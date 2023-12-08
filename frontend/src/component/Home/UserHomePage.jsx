// src/components/Home/UserHomePage.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserHomePage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call your backend logout route
            await axios.get('http://localhost:4000/api/logout');

            // Redirect to the login page
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <div className=" w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 rounded shadow-md w-96 text-black">
                <h2 className="text-2xl font-semibold mb-4">User Home Page</h2>
                {/* Add your content here */}

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

export default UserHomePage;
