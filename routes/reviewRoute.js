"use strict"

/*
 * Routes for non-authenticated review functionality
 */

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.route("/user/:id")
  .get(reviewController.getReviews);

module.exports = router;