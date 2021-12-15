"use strict"

/*
 * Controller handling everything regarding the review functionality that requires authentication via the bearer token
 */

const reviewModel = require("../models/reviewModel");
const {httpError} = require("../utils/errors");

// POST
const addReview = async (req, res, next) => {
  try {
    const review = {
      user_id: req.body.user_id,
      score: req.body.score
    };
    if (review.score > 5 || review.score < 0) {
      const err = httpError('Review score not within parameters!', 400);
      next(err);
      return;
    }
    const result = await (reviewModel.addReview(review, next, req.user));
    if (result.ok) {
      res.json({message: 'Review succesfully added!'});
      return;
    }
    res.json({message: 'Failed to add review!'});
  } catch (e) {
    const err = httpError('Failed to add review!', 400);
    next(err);
  }
}

// GET - Gets your current review for the person you're attempting to review and displays it in the review field.
const getReview = async (req, res, next) => {
  try {
    const review = await reviewModel.getReview(req.body.user_id, req.user.user_id, next);
    if (review) {
      res.json(review[0].score);
      return;
    } else {
      res.json("");
      return;
    }
  } catch (e) {
    const err = httpError('Failed to fetch review!', 400);
    next(err);
  }
}

// DELETE
const deleteReview = async (req, res, next) => {
  try {
    const response = await reviewModel.deleteReview(req.params.user_id, req.user, next);
    if (response) {
      res.json({message: "review deleted"});
      return;
    }
  } catch (e) {
    const err = httpError("Failed to delete review", 400);
    next(err);
  }
}

module.exports = {
  addReview,
  getReview,
  deleteReview,
}