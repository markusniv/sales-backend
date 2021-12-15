"use strict"

/*
 * Routes for non-authenticated user functionality
 */

const express = require('express');
const router = express.Router();
const commentGetController = require('../controllers/commentController');

router.route("/listing/:id")
  .get(commentGetController.getListingComments);

module.exports = router;