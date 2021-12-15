'use strict';

/*
 * Model for all the user functionality and user table's sql queries
 */

const pool = require('../database/db');
const {httpError} = require("../utils/errors");
const promisePool = pool.promise();

// GET - Get a singular user based on user_id
const getUser = async (userId, next) => {
  try {
    const [row] = await promisePool.execute("SELECT * FROM users WHERE user_id = ?", [userId]);
    delete row[0].passwd;
    return row[0];
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
}

// GET - Get all users
const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM users");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
}

// POST - Insert a new user into the user table
const addUser = async(user, next) => {
  console.log("Adding user", user);
  try {
    const [new_user] = await promisePool.execute(
      "INSERT INTO users (first_name, last_name, email, passwd) VALUES (?, ?, ?, ?);",
      ([user.first_name, user.last_name, user.email, user.passwd]));
    console.log(new_user);
    return new_user;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
}

// PUT - Modify user information, with two possible calls depending on whether or not user entered a new password or not
const modifyUser = async (current_user, user, next) => {
  try {
    if (user.passwd) {
      const [modified_user] = await promisePool.execute(
        "UPDATE users SET first_name = ?, last_name = ?, email = ?, passwd = ? WHERE user_id = ?",
        ([user.first_name, user.last_name, user.email, user.passwd, current_user.user_id])
      );
      return modified_user;
    } else {
      const [modified_user] = await promisePool.execute(
        "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?",
        ([user.first_name, user.last_name, user.email, current_user.user_id])
      );
      return modified_user;
    }
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
}

// PUT - Modify profile pic filename
const modifyProfilePic = async (filename, user, next) => {
  try {
    const [modified_user] = await promisePool.execute(
      "UPDATE users SET profile_pic = ? WHERE user_id = ?",
      ([filename, user.user_id])
    );
    return modified_user;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
}

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
      'SELECT * FROM users WHERE email = ?;',
      params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  addUser,
  modifyUser,
  getUserLogin,
  modifyProfilePic,
}