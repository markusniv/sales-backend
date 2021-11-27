'use strict';

const userModel = require("../models/userModel");
const {httpError, controllerError} = require("../utils/errors");

const getUser = async (req, res, next) => {
  const user = await userModel.getUser(req.params.id, next);
  if (user) {
    res.json(user);
    return;
  }
  const err = httpError("User not found", 404);
  next(err);
}

const getAllUsers = async (req, res, next) => {
  const users = await userModel.getAllUsers();
  for (let i = 0; i < users.length; i++) {
    delete users[i].passwd;
  }
  if (users.length > 0) {
    res.json(users);
    return;
  }
  const err = httpError("Users not found", 404);
  next(err);
}

const putUser = async (req, res, next) => {
  if (controllerError("putUser validation", req, next)) return;
  const response = await userModel.modifyUser(req.user, req.params.id, req.body, next);
  if (response.affectedRows !== 0) {
    res.json({ message: "Successfully modified user!" });
    return;
  }
  const err = httpError("Failed to modify user", 400);
  next(err);
}

const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('token not valid'));
  } else {
    res.json({ user: req.user });
  }
}

module.exports = {
  getUser,
  getAllUsers,
  putUser,
  checkToken,
}