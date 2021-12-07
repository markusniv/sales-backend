"use strict"

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const {validateComment} = require("../validators/commentValidator");

router.route("/")
  .get(commentController.getAllComments);


router.route("/:id")
  .delete(commentController.deleteComment)
  .get(commentController.getComment)
  .put(validateComment, commentController.modifyComment);

router.route("/listing/:id")
  .get(commentController.getListingComment)
  .post(validateComment, commentController.addComment);


module.exports = router;

