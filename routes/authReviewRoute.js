"use strict"

/*
 * Routes for authenticated review functionality
 */

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/authReviewController');

router.route("/:user_id")
  .delete(reviewController.deleteReview);

router.route("/")
  .post(reviewController.addReview)
  .get(reviewController.getReview);

module.exports = router;