const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    publishedYear: {
        type: Number,
    },
    serialNumber: {
        type: String,
        unique: true,
        trim: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    category: {
        type: String,
        trim: true,
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
