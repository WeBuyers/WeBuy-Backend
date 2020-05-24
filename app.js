const express = require('express');
const nodemon = require('nodemon');
const app = express();
const port = 8000;

const authRouter = require("./routes/auth");
const searchRouter = require("./routes/search");
const wishlistRouter = require("./routes/wishlist");
const database = require("./db")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/search', searchRouter);
app.use('/wishlist', wishlistRouter);


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
