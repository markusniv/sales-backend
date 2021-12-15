"use strict"

/*
 * Controller handling review functionality that doesn't require authentication
 */

const reviewModel = require("../models/reviewModel");
const {httpError} = require("../utils/errors");

// GET - Returns average score for user
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

module.exports = {
  getReviews,
}