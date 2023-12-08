import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const IssueBookPage = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const [email, setEmail] = useState('');

    const handleIssueBook = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/api/books/issue/${bookId}`,
                { bookId, email },
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                toast.success('Book issued successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                });
                // Redirect or perform other actions after successful issuance
                navigate('/user-home');
            } else {
                toast.error('Book issuance failed. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Issue Book</h2>
                <div className="mb-4">
                    <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
                        Book Id
                    </label>
                    <input
                        type="text"
                        id="bookId"
                        name="bookId"
                        value={bookId}
                        className="mt-1 p-2 w-full border rounded-md"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        User Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Enter User Email"
                    />
                </div>
                <button
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
                    onClick={handleIssueBook}
                >
                    Issue Book
                </button>
            </div>
        </div>
    );
};

export default IssueBookPage;
