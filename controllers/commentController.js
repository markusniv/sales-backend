"use strict"

/*
 * Controller handling comment functionality that doesn't require authentication
 */

const commentModel = require("../models/commentModel");
const {httpError} = require("../utils/errors");

// GET - Gets comments for a specific listing
const getListingComments = async (req, res, next) => {
  const listComment = await commentModel.getListingComments(req.params.id, next);
  if (listComment) {
    res.json(listComment);
    return
  }
  const err = httpError("comment not found", 404);
  next(err)
}

module.exports = {
  getListingComments,
}