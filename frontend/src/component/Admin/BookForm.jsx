// components/Admin/BookForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
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
            // Make a request to your backend to add a book
            const response = await axios.post('http://localhost:4000/api/book', formData);

            console.log(response.data); // Handle the response

            // Optionally, you can reset the form after successful submission
            setFormData({
                title: '',
                author: '',
                publishedYear: '',
                serialNumber: '',
                available: true,
                category: '',
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add Book</h2>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="publishedYear">Published Year:</label>
                    <input
                        type="text"
                        id="publishedYear"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="serialNumber">Serial Number:</label>
                    <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="available">Available:</label>
                    <select
                        id="available"
                        name="available"
                        value={formData.available}
                        onChange={handleInputChange}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleAddBook}>
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default BookForm;
