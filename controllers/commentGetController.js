"use strict"

const commentModel = require("../models/commentModel");
const {httpError} = require("../utils/errors");

const getListingComment = async (req, res, next) => {
  const listComment = await commentModel.getListingComments(req.params.id, next);
  if (listComment) {
    res.json(listComment);
    return
  }
  const err = httpError("comment not found", 404);
  next(err)
}



module.exports = {
  getListingComment,
}