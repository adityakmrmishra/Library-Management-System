const express = require('express');
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    issueBook,
    getIssuedBooksByUser,
    getIssuedBooks,
} = require('../controllers/bookController');

const router = express.Router();

router.route('/books').post(createBook).get(getAllBooks);
router.route('/books/:id').get(getBookById).put(updateBook).delete(deleteBook);
router.route('/books/issue/:id').post(issueBook);
router.route('/issued-books').get( getIssuedBooks);

module.exports = router;
