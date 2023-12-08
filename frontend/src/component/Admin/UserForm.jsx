// components/Admin/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user', // Set default role as 'user'
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = async () => {
        try {
            // Make a request to your backend to add a user
            const response = await axios.post('http://localhost:4000/api/register', formData);

            console.log(response.data); // Handle the response

            // Optionally, you can reset the form after successful submission
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'user',
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="button" onClick={handleAddUser}>
                    Add User
                </button>
            </form>
        </div>
    );
};

export default UserForm;
