"use strict"

/*
 * Model for all the comment functionality and comment table's sql queries
 */

const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

// GET - Returns all comments from specific listings
const getListingComments = async (listingId, next) => {
  try {
    const [row] = await promisePool.execute(
      "SELECT * FROM comments WHERE listing_id = ? ORDER BY comment_date ASC;",
      ([listingId]));
    return row;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// GET - Returns a specific comment base on its id
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

// POST - Adding a comment, comment creator based on the req.user id
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

// PUT - Modifying a comment, not available in frontend
const modifyComment = async (comment_id, comment, user, next) => {
  let query = "";
  let params = [];

  if (user.role === 0) {
    query = "UPDATE comments SET comment = ? WHERE comment_id = ?;"
    params = [comment.comment, comment_id];
  } else {
    query = "UPDATE comments SET comment = ? WHERE comment_id = ? AND user_id = ?;"
    params = [comment.comment, comment_id, user.user_id];
  }
  try{
    const [row] = await promisePool.execute(
      query,
      params
    );
    return row;
  } catch (e) {
    console.error("error modifying comment");
    const err = httpError("sql error", 500);
    next(err);
  }
}

// DELETE - Deleting a comment, available in frontend for user's own comments and for every comment if you're an admin
const deleteComment = async (comment_id, user, next) => {
  let query = "";
  let params = [];

  if (user.role === 0) {
    query = "DELETE FROM comments WHERE comment_id = ?;"
    params = [comment_id];
  } else {
    query = "DELETE FROM comments WHERE comment_id = ? AND user_id = ?;"
    params = [comment_id, user.user_id];
  }
  try {
    const [rows] = await promisePool.execute(
      query,
      params
    );
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
  getListingComments,
  modifyComment
}