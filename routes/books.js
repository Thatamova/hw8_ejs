const express = require('express');
const router = express.Router();
const {Book} = require('../models');

const books = [];

[1, 2].map(el => {
  const newBook = new Book(
    `Мертвые души ${el}`,
    `«Мертвые души» – уникальный роман, ставший для русской литературы своеобразным эталоном иронической прозы. ${el}`,
    `Николай Гоголь ${el}`,
    '',
    'https://cv6.litres.ru/pub/c/elektronnaya-kniga/cover_330/171960-nikolay-gogol-mertvye-dushi-171960.jpg',
    `Мертвые души ${el}`,
    'https://www.litres.ru/nikolay-gogol/mertvye-dushi-171960/'
  );
  books.push(newBook);
});

router.get('/', (req, res) => {
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

router.post('/create', (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  } = req.body;

  const book = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  books.push(book);

  res.redirect('/books')
});


router.get('/:id', (req, res) => {
  const {id} = req.params;
  const book = books.find(book => book.id === id);

  if (book) {
    res.render("books/view", {
      title: "Книга",
      book: book,
    });
  } else {
    res.status(404).redirect('/404');
  }
});

router.post('/delete/:id', (req, res) => {
  const {id} = req.params;
  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.redirect(`/books`);
  } else {
    res.status(404).redirect('/404');
  }
});

router.get('/update/:id', (req, res) => {
  const {id} = req.params;
  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex !== -1) {
    res.render("books/update", {
      title: "Редактировать",
      book: books[bookIndex],
    });
  } else {
    res.status(404).redirect('/404');
  }
});

router.post('/update/:id', (req, res) => {
  const {id} = req.params;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  } = req.body;
  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    };
    res.redirect(`/books/${id}`);
  } else {
    res.status(404).redirect('/404');
  }
});

module.exports = router;
