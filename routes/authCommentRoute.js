"use strict"

/*
 * Routes for authenticated comment functionality
 */

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/authCommentController');
const {validateComment} = require("../validators/commentValidator");

router.route("/:id")
  .delete(commentController.deleteComment)
  .put(validateComment, commentController.modifyComment);

router.route("/listing/:id")
  .post(validateComment, commentController.addComment);

module.exports = router;

