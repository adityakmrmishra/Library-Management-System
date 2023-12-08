// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const userData = response.data.user;

            console.log(response); // Handle the response from the backend

            // Check the user role and navigate accordingly
            if (userData.role === 'user') {
                navigate('/user-home'); // Replace with your user home page route
            } else if (userData.role === 'admin') {
                navigate('/admin-home'); // Replace with your admin home page route
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-screen flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-semibold mb-4">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
