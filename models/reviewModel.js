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


const addReview = async (review, next) => {
  console.log("adding review", review);
  try {
    const [new_review] = await promisePool.execute(
      "INSERT INTO reviews (user_id, score) VALUES (?, ?);",
      ([review.user_id, review.score]));
    return new_review;
  } catch (e) {
    console.error("error adding review");
    const err = httpError("sql error", 500);
    next(err);
  }
}

const changeReview = async (review_id, review, next) => {
  try{
    const [row] = await promisePool.execute(
      "UPDATE reviews SET score = ? WHERE review_id = ?;",
      ([review.score, review_id]));
    return row;
  } catch (e) {
    console.error("Error modifying review");
    const err = httpError("sql error", 500);
    next(err);
  }
}

const deleteReview = async (review_id, next) => {
  try{
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
  changeReview,
  deleteReview
}