// src/components/Home/UserHomePage.js
import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const UserHomePage = () => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/books`);
                const booksList = response.data.books;
                const newRows = booksList.map((item) => ({
                    id: item._id,
                    title: item.title,
                    author: item.author,
                    publishedYear: item.publishedYear,
                    serialNumber: item.serialNumber,
                    available: item.available,
                    category: item.category
                }));
                setBookList(newRows);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        };

        const fetchIssuedBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/issued-books/`, {
                    withCredentials: true,
                });

                console.log(response)
                const issuedBooksList = response.data.issuedBooks;
                const newIssuedBooks = issuedBooksList.map((item) => ({
                    id: item._id,
                    title: item.bookId.title,
                    author: item.bookId.author,
                    issueDate: item.bookId.issueDate,
                    returnDate: item.bookId.returnDate,
                    publishedYear: item.bookId.publishedYear,
                    serialNumber: item.bookId.serialNumber,
                    available: item.bookId.available,
                    category: item.bookId.category
                }));
                setIssuedBooks(newIssuedBooks);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        };

        fetchAllBooks();
        fetchIssuedBooks();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:4000/api/logout');
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };



    const returnBookHandler = async (bookId) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/books/return/${bookId}`, {}, {
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success('Book returned successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                });
                // Update the book list and issued books after returning
                const updatedBooks = bookList.map((book) =>
                    book.id === bookId ? { ...book, available: true } : book
                );
                setBookList(updatedBooks);
                const returnedBookId = response.data.returnedBookId;
                setIssuedBooks(issuedBooks.filter((book) => book.id !== returnedBookId));
            } else {
                toast.error('Book return failed. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    const columns = [
        { field: 'id', headerName: 'Book ID', minWidth: 150, flex: 0.5 },
        { field: 'title', headerName: 'Title', minWidth: 200, flex: 0.5 },
        { field: 'author', headerName: 'Author', minWidth: 150, flex: 0.3 },
        { field: 'publishedYear', headerName: 'PublishedYear', minWidth: 150, flex: 0.3 },
        { field: 'serialNumber', headerName: 'SerialNumber', minWidth: 150, flex: 0.3 },
        { field: 'available', headerName: 'Available', minWidth: 150, flex: 0.3 },
        { field: 'category', headerName: 'Category', minWidth: 150, flex: 0.3 },
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/issue/${params.getValue(params.id, 'id')}`}>
                        <h1 className="text-sm p-2 border">Issue</h1>
                    </Link>
                </Fragment>
            ),
        },
    ];
    const redirectToIssuedBooks = () => {
        // Use the navigate function to redirect to the desired route
        navigate('/issue'); // Replace :email with the actual email parameter
    };

    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 w-screen rounded shadow-md text-black">
                <div id="content" className="bg-white/10 md:w-full rounded-lg p-6 md:mr-5 h-[140vh]">
                    <h1 className="text-3xl md:text-4xl p-[0.5vmax] flex justify-left items-left font-Homehero box-border text-black">
                        ALL BOOKS
                    </h1>
                    <DataGrid
                        rows={bookList}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        className="bg-white border-none"
                        autoHeight
                    />
                    <h1 className="text-3xl md:text-4xl p-[0.5vmax] flex justify-left items-left font-Homehero box-border text-white mt-8">
                    <button onClick={redirectToIssuedBooks}>See Issued Books</button>
                    </h1>
                </div>

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
