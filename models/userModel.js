'use strict';
const pool = require('../database/db');
const {httpError} = require("../utils/errors");
const promisePool = pool.promise();

const getUser = async (userId, next) => {
  try {
    const [row] = await promisePool.query("SELECT * FROM users WHERE user_id = ?", [userId]);
    delete row[0].passwd;
    return row[0];
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
}

module.exports = {
  getUser,
}