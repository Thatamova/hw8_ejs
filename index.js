const express = require('express');
const cors = require('cors');

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

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});
