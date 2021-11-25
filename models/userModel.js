'use strict';
const pool = require('../database/db');
const {httpError} = require("../utils/errors");
const promisePool = pool.promise();

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

const addUser = async(user, next) => {
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

// TODO: Make it so that users can only modify their own info

const modifyUser = async (id, user, next) => {
  try {
    const [modified_user] = await promisePool.execute(
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, passwd = ? WHERE user_id = ?",
      ([user.first_name, user.last_name, user.email, user.passwd, id])
    );
    return modified_user;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("Sql error", 500);
    next(err);
  }
}

module.exports = {
  getUser,
  getAllUsers,
  addUser,
  modifyUser,
}