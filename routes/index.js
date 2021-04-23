const express = require('express');
const router  = express.Router();

const Book = require ('../models/Book.model.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res, next) => {
  Book.find()
    .then(allTheBooksFromDB => {
      console.log('Retrieved from DB: ', allTheBooksFromDB);
      res.render('books-list', {books: allTheBooksFromDB});
    })
    .catch(err => {
      console.log('Error while getting the books from the DB: ', err);
      next(err);
  });
});

router.get('/books/:bookId', (req, res, next) => {
  const { bookId } = req.params;
  
  Book.findOne({_id: bookId})
    .then(theBook => {
      console.log('book: the book', {book: theBook }, '{bookId}: ', {bookId});
      res.render('book-details', { book: theBook })
    })
    .catch(err => {
      console.log('Error while retrieving book details: ', err);
      next(err);
    });
});




module.exports = router;
