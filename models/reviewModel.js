"use strict"

/*
 * Model for all the review functionality and review table's sql queries
 */

const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

// GET - Get reviews for a user
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

/*
 POST - Add a review for a user. Reviews have a unique key column, where the key is based on the person being reviewed
        and the reviewer. The id's of these users are added together, e.g. "15" + "20" => unique_key: "1520". The query
        checks whether or not a review already exists with this unique key when inserting, and if it does, it'll instead
        do an update.
 */
const addReview = async (review, next, reviewer) => {
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

// GET - Get a review for a specific user by a specific user
const getReview = async (userId, reviewerId, next) => {
  try {
    const [row] = await promisePool.execute(
      "SELECT * FROM reviews WHERE user_id = ? AND reviewer_id = ?;",
      ([userId, reviewerId]));
    return row;
  } catch (e) {
    console.log("error", e.message);
    const err = httpError("sql error", 500);
    next(err);
  }
}

// DELETE - Delete a singular review, not available via frontend
const deleteReview = async (user_id, user, next) => {
  let query = "";
  let params = [];
  const unique_key = user_id.toString() + user.user_id.toString();

  query = "DELETE FROM reviews WHERE unique_key = ? AND reviewer_id = ?;"
  params = [unique_key, user.user_id];

  try {
    const [row] = await promisePool.execute(
      query,
      params
    );
    return row;
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