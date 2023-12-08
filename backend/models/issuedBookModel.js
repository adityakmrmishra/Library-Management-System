
const mongoose = require('mongoose');
const validator = require("validator");

const issuedBookSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
    },
});

const IssuedBook = mongoose.model('IssuedBook', issuedBookSchema);

module.exports = IssuedBook;
