const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

const users = require('./routes/userRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', users);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
