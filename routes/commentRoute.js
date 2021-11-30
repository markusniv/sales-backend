"use strict"

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route("/")
  .post(commentController.addComment);


router.route("/:id")
  .delete(commentController.deleteComment);


module.exports = router;

