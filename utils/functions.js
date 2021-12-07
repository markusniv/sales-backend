const userModel = require("../models/userModel");
const {httpError} = require("../utils/errors");

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

module.exports = {
  getUser,
  getAllUsers,
}