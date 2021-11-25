const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

const users = require('./routes/userRoute');
const listings = require('./routes/listingRoute')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', users);
app.use('/listing',listings);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'internal error' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
