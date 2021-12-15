"use strict"

/*
 * Controller handling everything regarding the comment system that requires authentication via the bearer token
 */

const commentModel = require("../models/commentModel");
const {httpError} = require("../utils/errors");

// POST
const addComment = async (req, res, next) => {
  try {
    const comment = {
      listing_id: req.params.id,
      user_id: req.user.user_id,
      comment: req.body.comment
    };
    console.log(comment);
    const result = await (commentModel.addComment(comment, next));
    res.json({message: 'comment added', id: result.insertId});
  } catch (e) {
    console.log(req.params.id);
    console.log(req.user.user_id);
    const err = httpError('failed to add comment', 400);
    next(err);
  }
}

// PUT
const modifyComment = async (req, res, next) => {
  try {
    const response = await commentModel.modifyComment(req.params.id, req.body, req.user, next);
    if (response.affectedRows !== 0) {
      res.json({message: "comment modified"});
      return;
    } else {
      res.json({message: "comment modification failed, unauthorized?"});
      return
    }
  } catch (e) {
    const err = httpError("Failed to modify comment", 400);
    next(err);
  }
}

// DELETE
const deleteComment = async (req, res, next) => {
  try {
    const response = await commentModel.deleteComment(req.params.id, req.user, next);
    if (response) {
      res.json({message: "comment deleted"});
      return
    } else {
      res.json({message: "comment deletion failed, unauthorized?"});
      return
    }
  } catch (e) {
    const err = httpError("Failed to delete comment", 400);
    next(err);
  }
}

module.exports = {
  addComment,
  deleteComment,
  modifyComment
}