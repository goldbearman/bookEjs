const express = require('express');

const errorMiddleware = require('./middleware/error');

// const indexRouter = require('./routes/index');
const todoRouter = require('./routes/book');

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', todoRouter);
app.use('/book', todoRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
