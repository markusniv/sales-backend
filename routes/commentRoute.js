"use strict"

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const {validateComment} = require("../validators/commentValidator");

router.route("/")
  .post(validateComment, commentController.addComment)
  .get(commentController.getAllComments);


router.route("/:id")
  .delete(commentController.deleteComment)
  .get(commentController.getComment)
  .put(validateComment, commentController.modifyComment);

router.route("/listingComments/:id")
  .get(commentController.getListingComment);


module.exports = router;

