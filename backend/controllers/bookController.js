const Book = require('../models/bookModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new book
exports.createBook = catchAsyncErrors(async (req, res, next) => {
    const { title, author, publishedYear, genre, serialNumber, available, category } = req.body;

    const book = await Book.create({
        title,
        author,
        publishedYear,
        genre,
        serialNumber,
        available,
        category,
    });

    res.status(201).json({
        success: true,
        book,
    });
});

// Get all books
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();

    res.status(200).json({
        success: true,
        count: books.length,
        books,
    });
});

// Get a single book by ID
exports.getBookById = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler(`Book not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        book,
    });
});

// Update a book by ID
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if (!updatedBook) {
        return next(new ErrorHandler(`Book not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        updatedBook,
    });
});

// Delete a book by ID
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler(`Book not found with id: ${req.params.id}`, 404));
    }

    await book.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
    });
});
