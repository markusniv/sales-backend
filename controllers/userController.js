'use strict';

const userModel = require('../models/userModel');
const {httpError} = require("../utils/errors");

const getUser = async (req, res, next) => {
  const user = await userModel.getUser(req.params.id, next);
  if (user) {
    res.json(user);
    return;
  }
  const err = httpError('User not found', 404);
  next(err);
}

module.exports = {
  getUser,
}