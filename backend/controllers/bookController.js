const Book = require('../models/bookModel');
const IssuedBook = require('../models/issuedBookModel')
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



// Issue a book
exports.issueBook = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler(`Book not found with id: ${req.params.id}`, 404));
    }

    if (!book.available) {
        return next(new ErrorHandler('Book is not available for issuance', 400));
    }

    // Set the book as unavailable
    // book.available = false; 
    await book.save();

    // Create an entry in the IssuedBook model
    const issuedBook = new IssuedBook({
        email: req.email,
        bookId: book.id,
        issueDate: new Date(),
    });

    await issuedBook.save();

    res.status(200).json({
        success: true,
        message: 'Book issued successfully',
    });
});

// Get issued books by user ID
exports.getIssuedBooks = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;

    const issuedBooks = await IssuedBook.find({ userId }).populate('bookId');

    res.status(200).json({
        success: true,
        issuedBooks,
    });
});
