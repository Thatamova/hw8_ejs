const express = require('express');
const router = express.Router();
const Book = require('../models/book');


router.get('/', async (req, res) => {
  const books = await Book.find();

  res.render("books/index", {
    title: "Список книг",
    books: books,
  });
});

router.get('/create', (req, res) => {
  res.render("books/create", {
    title: "Создать книгу",
    book: {},
  });
});

router.post('/create', async (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  } = req.body;

  const book = new Book({ title, description, authors, favorite, fileCover, fileName });

  try {
    await book.save();
    res.redirect('/books')
  } catch (e) {
    console.error(e);
  }
});


router.get('/:id', async (req, res) => {
  const {id} = req.params;
  let book = {};

  try {
    book = await Book.findById(id);
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }

  res.render("books/view", {
    title: "Книга",
    book: book,
  });
});

router.post('/delete/:id', async (req, res) => {
  const {id} = req.params;

  try {
    await Book.deleteOne({_id: id});
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }

  res.redirect(`/books`);
});

router.get('/update/:id', async (req, res) => {
  const {id} = req.params;
  let book = {};

  try {
    book = await Book.findById(id);
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }

  res.render("books/update", {
    title: "Редактировать",
    book: book,
  });
});

router.post('/update/:id', async (req, res) => {
  const {id} = req.params;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body;

  try {
    await Book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }

  res.redirect(`/books/${id}`);
});

module.exports = router;
