"use strict"

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewAddController');

router.route("/")
  .post(reviewController.addReview)
  .get(reviewController.getReview);

module.exports = router;