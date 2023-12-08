
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

const AllUsersPage = ({ userValues }) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/admin/users`, {
                    withCredentials: true,
                });

                const usersList = response.data.users;
                const newRows = usersList.map((item) => ({
                    id: item._id,
                    role: item.role,
                    email: item.email,
                    name: item.name,
                }));
                setRows(newRows);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        };

        fetchAllUsers();
    }, []);

    const deleteUserHandler = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/admin/user/${id}`, {
                withCredentials: true,
            });
    
            if (response.status === 200) {
                toast.success('Delete successful', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                });
                // Update the user list after deletion
                const updatedRows = rows.filter((user) => user.id !== id);
                setRows(updatedRows);
            } else {
                toast.error('User delete failed. Please try again.', {
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
        { field: 'id', headerName: 'User ID', minWidth: 150, flex: 0.5 },
        { field: 'email', headerName: 'Email', minWidth: 200, flex: 0.5 },
        { field: 'name', headerName: 'Name', minWidth: 150, flex: 0.3 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, 'role') === 'admin'
                    ? 'text-green-900' : 'text-red-600';
            },
        },
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (
                <Fragment>
                    {/* <Link to={`/admin/update-user/${params.getValue(params.id, 'id')}`}>
                        <EditIcon />
                    </Link> */}
                    <Button onClick={() => deleteUserHandler(params.getValue(params.id, 'id'))}>
                        <DeleteIcon />
                    </Button>
                </Fragment>
            ),
        },
    ];

    return (
        <Fragment>
            <div className="w-full mt-10 bg-black min-h-screen text-slate-300 relative py-4">
                <div className="flex flex-col md:flex-row mx-auto gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-full my-10 px-3  lg:px-10">

                    {/* Main dashboard */}
                    <div id="content" className="bg-white/10 md:w-full rounded-lg p-6 md:mr-5 h-[140vh]">
                        <h1 className="text-3xl md:text-4xl p-[0.5vmax] flex justify-left items-left font-Homehero box-border  text-white">
                            ALL USERS
                        </h1>
                        <DataGrid
                            rows={rows}
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
        </Fragment>
    );
};

export default AllUsersPage;
