"use strict"

const reviewModel = require("../models/reviewModel");
const {httpError} = require("../utils/errors");


const getReviews = async (req, res, next) => {
  const reviews = await reviewModel.getReviews(req.params.id, next);
  if (reviews) {
    res.json(reviews);
    return;
  }
  const err = httpError("reviews not found", 404);
  next(err);
}

const addReview = async (req, res, next) => {
  try {
    const review = {
      user_id: req.body.user_id,
      score: req.body.score
    };
    console.log(review);
    const result = await (reviewModel.addReview(review, next));
    res.json({message: 'review added', id: result.insertId});
  } catch (e) {
    const err = httpError('failed to add review', 400);
    next(err);
  }
}

const changeReview = async (req, res, next) => {
  try{
    const response = await reviewModel.changeReview(req.params.id, req.body, next);
    if(response.affectedRows !== 0){
    res.json({ message: "review changed" });
    return;
    }
  } catch (e) {
    const err = httpError("Failed to change review", 400);
    next(err);
  }
}

const deleteReview = async (req, res, next) => {
  try{
    const response = await reviewModel.deleteReview(req.params.id, req.body, next);
    if (response.affectedRows !== 0){
      res.json({ message: "review deleted"});
      return;
    }
  } catch (e) {
    const err = httpError("Failed to delete review", 400);
    next(err);
  }
}

module.exports = {
  addReview,
  getReviews,
  changeReview,
  deleteReview
}