const userModel = require("../models/userModel");
const {httpError} = require("../utils/errors");
const {getUser, getAllUsers} = require("../utils/functions");

const getUserNonLogged = async (req, res, next) => {
  await getUser(req, res, next);
}

const getAllUsersNonLogged = async (req, res, next) => {
  await getAllUsers(req, res, next);
}

module.exports = {
  getUserNonLogged,
  getAllUsersNonLogged,
}