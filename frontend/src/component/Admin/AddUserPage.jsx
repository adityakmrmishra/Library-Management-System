import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = async () => {
        try {
            await axios.post('http://localhost:4000/api/register', formData);

            // Redirect to the user list page
            navigate('/admin/all-users');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-screen h-[90vh] p-4 bg-white ">
            <h2 className="text-2xl font-semibold mb-4">Add User</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Name:</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Email:</label>
                <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            {/* Add more fields as needed */}
            <div>
                <button
                    onClick={handleAddUser}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Add User
                </button>
            </div>
        </div>
    );
};

export default AddUserPage;
