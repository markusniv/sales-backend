"use strict"

const reviewModel = require("../models/reviewModel");
const {httpError} = require("../utils/errors");

const addReview = async (req, res, next) => {
  try {
    const review = {
      user_id: req.body.user_id,
      score: req.body.score
    };
    if (review.score > 5 || review.score < 0) {
      const err = httpError('review score not within parameters!', 400);
      next(err);
      return;
    }
    const result = await (reviewModel.addReview(review, next, req.user));
    res.json({message: 'review added'});
  } catch (e) {
    const err = httpError('failed to add review', 400);
    next(err);
  }
}

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
    const err = httpError('failed to fetch review', 400);
    next(err);
  }
}

module.exports = {
  addReview,
  getReview,
}