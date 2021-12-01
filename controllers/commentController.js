"use strict"

const commentModel = require("../models/commentModel");
const {httpError} = require("../utils/errors");

const getComment = async (req, res, next) => {
  const comment = await commentModel.getComment(req.params.id, next);
  if (comment) {
    res.json(comment);
    return;
  }
  const err = httpError("comment not found", 404);
  next(err);
}

const getListingComment = async (req, res, next) => {
  const listComment = await commentModel.getListingComments(req.params.id, next);
  if (listComment) {
    res.json(listComment);
    return
  }
  const err = httpError("comment not found", 404);
  next(err)
}

const getAllComments = async (req, res, next) => {
  const comments = await commentModel.getAllComments();
  if (comments.length > 0) {
    res.json(comments);
    return;
  }
  const err = httpError("comments not found", 404);
  next(err);
}

const addComment = async (req, res, next) => {
  try {
    const comment = {
      listing_id: req.body.listing_id,
      user_id: req.body.user_id,
      comment: req.body.comment
    };
    console.log(comment);
    const result = await (commentModel.addComment(comment, next));
    res.json({message: 'comment added', id: result.insertId});
  } catch (e) {
    const err = httpError('failed to add comment', 400);
    next(err);
  }
}

const modifyComment = async (req, res, next) => {
  try {
    const response = await commentModel.modifyComment(req.params.id, req.body, next);
    if (response.affectedRows !== 0) {
      res.json({message: "comment modified"});
      return;
    }
  } catch (e) {
    const err = httpError("Failed to modify comment", 400);
    next(err);
  }
}

const deleteComment = async (req, res, next) => {
  try {
    const response = await commentModel.deleteComment(req.params.id, req.body, next);
    if (response.affectedRows !== 0) {
      res.json({message: "comment deleted"});
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
  getComment,
  getAllComments,
  getListingComment,
  modifyComment
}