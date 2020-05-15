const express = require('express');
const app = express();
const port = 8000;

const authRouter = require("./routes/auth");
const searchRouter = require("./routes/search");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/search', searchRouter);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
