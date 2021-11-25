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

const postUser = async (req, res, next) => {
  if (controllerError("postUser validation", req, next)) return;
  const response = await userModel.addUser(req.body, next);
  if (response.insertId !== undefined) {
    res.json({ message: "Registration successful!", user_id: response.insertId });
    return;
  }
  const err = httpError("Failed to add user", 400);
  next(err);
}

const putUser = async (req, res, next) => {
  if (controllerError("putUser validation", req, next)) return;
  const response = await userModel.modifyUser(req.params.id, req.body, next);
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
  postUser,
  putUser,
  checkToken,
}