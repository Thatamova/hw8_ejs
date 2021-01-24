#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const dbPassword = process.env.PASSWORD;
    const dbName = 'mongo-node';

    const dbUrl = `mongodb+srv://admin:${dbPassword}@cluster0.1xfza.mongodb.net/${dbName}`;

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  } catch (e) {
      console.log(e);
  }
}

start();
