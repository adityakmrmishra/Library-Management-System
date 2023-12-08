const express = require('express');
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

router.route('/books').post(createBook).get(getAllBooks);
router.route('/books/:id').get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
