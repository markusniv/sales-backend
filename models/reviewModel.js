"use strict"

const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();


const getReviews = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM reviews WHERE user_id = ?;",
      ([userId]));
    return rows;
  } catch (e) {
    console.log("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

const addReview = async (review, next, reviewer) => {
  console.log("adding review", review);
  const unique_key = review.user_id.toString() + reviewer.user_id.toString();
  try {
    const [new_review] = await promisePool.execute(
      `INSERT INTO reviews (user_id, score, reviewer_id, unique_key)
            VALUES ('${review.user_id}', '${review.score}', '${reviewer.user_id}', '${unique_key}')
            ON DUPLICATE KEY UPDATE
                score = VALUES(score);`
    );
    return new_review;
  } catch (e) {
    console.error("error adding review");
    const err = httpError("sql error", 500);
    next(err);
  }
}

const getReview = async (userId, reviewerId, next) => {
  try {
    const [row] = await promisePool.execute(
      "SELECT * FROM reviews WHERE user_id = ? AND reviewer_id = ?;",
      ([userId, reviewerId]));
    console.log(row);
    return row;
  } catch (e) {
    console.log("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

const deleteReview = async (review_id, next) => {
  try {
    const row = await promisePool.execute(
      "DELETE FROM reviews WHERE review_id = ?;", [review_id]);
    return row.affectedRows === 1;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("error deleting review", 500);
    next(err);
  }
}

module.exports = {
  addReview,
  getReviews,
  getReview,
  deleteReview
}