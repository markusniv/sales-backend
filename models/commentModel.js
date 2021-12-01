"use strict"

const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

//returns all comments from spesific listing
const getListingComments = async (listingId, next) => {
  try {
    const [row] = await promisePool.execute(
      "SELECT * FROM comments WHERE listing_id = ?;",
      ([listingId]));
    return row;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

const getComment = async (commentId, next) => {
  try {
    const [row] = await promisePool.execute(
      "SELECT * FROM comments WHERE comment_id = ?;",
      ([commentId]));
    return row[0];
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

const getAllComments = async (next) => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM comments");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}


const addComment = async (comment, next) => {
  console.log("adding comment", comment);
  try {
    const [new_comment] = await promisePool.execute(
      "INSERT INTO comments (listing_id, user_id, comment) VALUES (?, ?, ?);",
      ([comment.listing_id, comment.user_id, comment.comment]));
    return new_comment;
  } catch (e) {
    console.error("error model add comment");
    const err = httpError("sql error", 500);
    next(err);
  }
}

const modifyComment = async (comment_id, comment, next) => {
  try{
    const [row] = await promisePool.execute(
      "UPDATE comments SET comment = ? WHERE comment_id = ?;",
      ([comment.comment, comment_id]));
    return row;
  } catch (e) {
    console.error("error modifying comment");
    const err = httpError("sql error", 500);
    next(err);
  }
}

const deleteComment = async (comment_id, next) => {
  try {
    const [rows] = await promisePool.execute(
      "DELETE FROM comments WHERE comment_id = ?;", ([comment_id]));
    return rows.affectedRows === 1;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("error deleting comment", 500);
    next(err);
  }
}

module.exports = {
  addComment,
  deleteComment,
  getComment,
  getAllComments,
  getListingComments,
  modifyComment
}