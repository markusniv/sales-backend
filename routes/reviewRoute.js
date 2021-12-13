"use strict"

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.route("/:id")
  .delete(reviewController.deleteReview);

router.route("/user/:id")
  .get(reviewController.getReviews);

module.exports = router;