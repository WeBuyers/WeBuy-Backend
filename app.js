const express = require('express');
const app = express();
const port = 8000;

const authRouter = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
