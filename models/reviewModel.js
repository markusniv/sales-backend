"use strict"

const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();



const getReviews = async (userId, next) => {
  try{
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
  try{
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

module.exports = {
  addReview,
  getReviews,
}