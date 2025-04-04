// src/components/Home/UserHomePage.js
import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const UserHomePage = () => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const { email } = useParams(); 
    const [issuedBooks, setIssuedBooks] = useState([]);

    useEffect(() => {

        const fetchIssuedBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/issued-books/`, {
                    withCredentials: true,
                });

                console.log(response)
                const issuedBooksList = response.data.issuedBooks;
                const newIssuedBooks = issuedBooksList.map((item) => ({
                    id: item.bookId._id,
                    title: item.bookId.title,
                    author: item.bookId.author,
                    issueDate: String(item.issueDate).substr(0, 10),
                    returnDate:String(item.returnDate).substr(0, 10) ,
                    publishedYear: item.bookId.publishedYear,
                    serialNumber: item.bookId.serialNumber,
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



    // const returnBookHandler = async (bookId) => {
    //     try {
    //         const response = await axios.put(`http://localhost:4000/api/books/return/${bookId}`, {}, {
    //             withCredentials: true,
    //         });

    //         if (response.status === 200) {
    //             toast.success('Book returned successfully', {
    //                 position: 'top-right',
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //             });
    //             // Update the book list and issued books after returning
    //             const updatedBooks = bookList.map((book) =>
    //                 book.id === bookId ? { ...book, available: true } : book
    //             );
    //             setBookList(updatedBooks);
    //             const returnedBookId = response.data.returnedBookId;
    //             setIssuedBooks(issuedBooks.filter((book) => book.id !== returnedBookId));
    //         } else {
    //             toast.error('Book return failed. Please try again.', {
    //                 position: 'top-right',
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response.data.message, {
    //             position: 'top-right',
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //         });
    //     }
    // };

    const columns = [
        { field: 'id', headerName: 'Book ID', minWidth: 150, flex: 0.5 },
        { field: 'issueDate', headerName: 'IssueDate', minWidth: 150, flex: 0.5 },
        { field: 'returnDate', headerName: 'ReturnDate', minWidth: 150, flex: 0.5 },
        { field: 'title', headerName: 'Title', minWidth: 200, flex: 0.5 },
        { field: 'author', headerName: 'Author', minWidth: 150, flex: 0.3 },
        { field: 'publishedYear', headerName: 'PublishedYear', minWidth: 150, flex: 0.3 },
        { field: 'serialNumber', headerName: 'SerialNumber', minWidth: 150, flex: 0.3 },
        { field: 'category', headerName: 'Category', minWidth: 150, flex: 0.3 },

    ];

    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 w-screen rounded shadow-md text-black">
                <div id="content" className="bg-white/10 md:w-full rounded-lg p-6 md:mr-5 h-[140vh]">
                    <h1 className="text-3xl md:text-4xl p-[0.5vmax] flex justify-left items-left font-Homehero box-border text-black mt-8">
                        ISSUED BOOKS
                    </h1>
                    <DataGrid
                        rows={issuedBooks}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        className="bg-white border-none"
                        autoHeight
                    />
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
