
import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const AllBooksPage = () => {
    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/books`);
                const booksList = response.data.books;
                const newRows = booksList.map((item) => ({
                    id: item._id,
                    title: item.title,
                    author: item.author,
                    publishedYear:item.publishedYear,
                    serialNumber:item.serialNumber,
                    available:item.available,
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
    
        fetchAllBooks();
    }, []);

    const deleteBookHandler = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/books/${id}`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success('Delete successful', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                });
                // Update the book list after deletion
                const updatedBooks = bookList.filter(book => book._id !== id);
                setBookList(updatedBooks);
            } else {
                toast.error('Book delete failed. Please try again.', {
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
        // Add more fields as needed
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (
                <Fragment>
                <Link to={`/admin/update-book/${params.getValue(params.id, 'id')}`}>
                    <EditIcon />
                </Link>
                <Button onClick={() => deleteBookHandler(params.getValue(params.id, 'id'))}>
                    <DeleteIcon />
                </Button>
            </Fragment>
            ),
        },
    ];
    

    return (

        <div className="w-full mt-10 bg-black min-h-screen text-slate-300 relative py-4">
            <div className="flex flex-col md:flex-row mx-auto gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-full my-10 px-3 lg:px-10">
                {/* Main dashboard */}
                <div id="content" className="bg-white/10 md:w-full rounded-lg p-6 md:mr-5 h-[140vh]">
                    <h1 className="text-3xl md:text-4xl p-[0.5vmax] flex justify-left items-left font-Homehero box-border text-white">
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
                </div>
            </div>
        </div>
    );
};

export default AllBooksPage;
