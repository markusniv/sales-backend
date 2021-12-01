"use strict"


const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.route("/")
  .post(reviewController.addReview);

router.route("/:id")
  .put(reviewController.changeReview)
  .delete(reviewController.deleteReview);


router.route("/user/:id")
  .get(reviewController.getReviews);


module.exports = router;