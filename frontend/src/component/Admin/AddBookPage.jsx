// src/components/Admin/AddBookPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishedYear: '',
        serialNumber: '',
        available: true,
        category: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddBook = async () => {
        try {
            await axios.post('http://localhost:4000/api/books', formData);

            // Redirect to the  list page
            navigate('/admin/all-books');

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-screen h-[90vh] p-4 bg-white ">
            <h2 className="text-2xl font-semibold mb-4">Add Book</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Title:</label>
                <input
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Author:</label>
                <input
                    type="text"
                    name="author"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Published Year:</label>
                <input
                    type="text"
                    name="publishedYear"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Serial Number:</label>
                <input
                    type="text"
                    name="serialNumber"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Category:</label>
                <input
                    type="text"
                    name="category"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                />
            </div>
            {/* Add more fields as needed */}
            <div>
                <button
                    onClick={handleAddBook}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default AddBookPage;
