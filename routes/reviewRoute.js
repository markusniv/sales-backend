"use strict"


const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');



router.route("/")
  .post(reviewController.addReview);



router.route("/user/:id")
  .get(reviewController.getReviews);




module.exports = router;