"use strict"

const express = require('express');
const router = express.Router();
const commentGetController = require('../controllers/commentGetController');

router.route("/listing/:id")
  .get(commentGetController.getListingComment);

module.exports = router;