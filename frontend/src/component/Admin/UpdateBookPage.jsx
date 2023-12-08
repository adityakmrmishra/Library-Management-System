import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateBookPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publishedYear: '',
    serialNumber: '',
    available: true,
    category: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/books/${bookId}`, {
          withCredentials: true,
        });

        const bookDetails = response.data.book;
        setBookData({
          title: bookDetails.title,
          author: bookDetails.author,
          publishedYear: bookDetails.publishedYear.toString(), // Convert to string for input type="date"
          serialNumber: bookDetails.serialNumber,
          available: bookDetails.available,
          category: bookDetails.category,
        });
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleInputChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/api/books/${bookId}`, bookData, {
        withCredentials: true,
      });

      console.log('Book updated successfully');
      navigate('/all-books');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="w-screen mt-10 bg-black min-h-screen text-slate-300 relative py-4">
      <div className="flex flex-col md:flex-row mx-auto gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-full my-10 px-5 md:px-10">
        {/* Your navigation/sidebar component can go here */}
        <div className="w-full flex flex-col h-[100vh] box-border bg-gray-300  p-5">
          <form
            className="flex flex-col justify-evenly items-center m-auto p-3 sm:w-1/2 md:w-1/3 h-[70%]  bg-white/60 rounded shadow-lg shadow-black"
            onSubmit={handleUpdateBook}
          >
            <h1 className="text-black align-middle text-3xl md:text-4xl font-Homehero">Update Book</h1>

            {/* Example input fields, update with your book fields */}
            <div className="flex items-center w-[100%]">
              <label htmlFor="title" className="mr-2 text-black">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={bookData.title}
                onChange={handleInputChange}
                className="w-full p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none"
              />
            </div>

            <div className="flex items-center w-[100%]">
              <label htmlFor="author" className="mr-2 text-black">
                Author:
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={bookData.author}
                onChange={handleInputChange}
                className="w-full p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none"
              />
            </div>

            <div className="flex items-center w-[100%]">
              <label htmlFor="publishedYear" className="mr-2 text-black">
                Published Year:
              </label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                value={bookData.publishedYear}
                onChange={handleInputChange}
                className="w-full p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none"
              />
            </div>

            <div className="flex items-center w-[100%]">
              <label htmlFor="serialNumber" className="mr-2 text-black">
                Serial Number:
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={bookData.serialNumber}
                onChange={handleInputChange}
                className="w-full p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none"
              />
            </div>

            <div className="flex items-center w-[100%]">
              <label htmlFor="available" className="mr-2 text-black">
                Available:
              </label>
              <select
                id="available"
                name="available"
                value={bookData.available}
                onChange={handleInputChange}
                className="w-full p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div className="flex items-center w-[100%]">
              <label htmlFor="category" className="mr-2 text-black">
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={bookData.category}
                onChange={handleInputChange}
                className="w-full p-4 box-border rounded-sm text-sm md:text-[0.9vmax] outline-none"
              />
            </div>


            <button
              type="submit"
              className="bg-black/5 text-white text-[0.9vmax] w-1/2 p-[0.8vmax] cursor-pointer outline-none shadow-sm shadow-black hover:bg-black/10 transition duration-200 ease-in-out"
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBookPage;
