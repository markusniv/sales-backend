const express = require('express')
const cors = require("cors");
const app = express();
const port = 3000;
const passport = require('./utils/pass');
const auth = require('./routes/authRoute');

const users = require('./routes/userRoute');
const usersGet = require('./routes/userNonLoggedRoute');
const listings = require('./routes/listingRoute');
const comments = require('./routes/commentRoute');
const reviews = require('./routes/reviewRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/uploads', express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), users);
app.use('/userGet', usersGet)
app.use('/listing',listings);
app.use('/comment', comments);
app.use('/review', reviews);


app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'internal error' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
