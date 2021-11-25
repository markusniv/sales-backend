'use strict';

const userModel = require('../models/userModel');

const getUser = async (req, res, next) => {
  const user = await userModel.getUser(req.params.id);
  if (user) {
    res.json(user);
    return;
  }
  console.error('error');
}

module.exports = {
  getUser,
}