"use strict"

const commentModel = require("../models/commentModel");
const {httpError} = require("../utils/errors");


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

const deleteComment = async (req, res, next) => {
  try{
    const response = await commentModel.deleteComment(req.params.id, req.body, next);
    if (response.affectedRows !== 0){
      res.json({ message: "comment deleted" });
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
}