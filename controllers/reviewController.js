"use strict"

const reviewModel = require("../models/reviewModel");
const {httpError} = require("../utils/errors");

//Returns average score for user
const getReviews = async (req, res, next) => {
  const reviews = await reviewModel.getReviews(req.params.id, next);
  let average = 0
  for (let i = 0; i < reviews.length; i++){
    average += reviews[i].score;
  }
  average = average / reviews.length;
  let rounded = Math.round(average * 10) / 10;
  if (rounded >= 0) {
    res.json(rounded);
    return;
  }
  const err = httpError("reviews not found", 404);
  next(err);
}

const deleteReview = async (req, res, next) => {
  try {
    const response = await reviewModel.deleteReview(req.params.id, req.body, next);
    if (response.affectedRows !== 0) {
      res.json({message: "review deleted"});
      return;
    }
  } catch (e) {
    const err = httpError("Failed to delete review", 400);
    next(err);
  }
}

module.exports = {
  getReviews,
  deleteReview
}