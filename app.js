const express = require('express')
const cors = require("cors");
const app = express();
const port = 3000;
const passport = require('./utils/pass');
const auth = require('./routes/authRoute');

const users = require('./routes/userRoute');
const usersGet = require('./routes/userNonLoggedRoute');
const listings = require('./routes/listingRoute');
const authListings = require('./routes/authListingRoute');
const comments = require('./routes/commentRoute');
const commentGet = require('./routes/commentGetRoute');
const reviews = require('./routes/reviewRoute');
const reviewsAdd = require('./routes/addReviewRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/uploads', express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), users);
app.use('/userGet', usersGet);
app.use('/authListing', passport.authenticate('jwt', {session: false}), authListings);
app.use('/listing', listings);
app.use('/commentGet', commentGet);
app.use('/comment', passport.authenticate('jwt', {session: false}), comments);
app.use('/review', reviews);
app.use('/addReview', passport.authenticate('jwt', {session: false}), reviewsAdd);


app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.log("error");
    res.status(status).json({ error: true, message: err.message || 'internal error' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
