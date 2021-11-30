"use strict"

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route("/")
  .post(commentController.addComment)
  .get(commentController.getAllComments);


router.route("/:id")
  .delete(commentController.deleteComment)
  .get(commentController.getComment);


module.exports = router;

