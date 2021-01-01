const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render("index", {
    title: "Книги",
  });
});

router.get('/404', (req, res) => {
  res.render("layout/404", {
    title: "Такой страницы не существует",
  });
});

module.exports = router;
