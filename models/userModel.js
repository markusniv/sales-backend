'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getUser = async (userId, next) => {
  try {
    const [row] = await promisePool.query("SELECT * FROM users WHERE user_id = ?", [userId]);
    delete row[0].passwd;
    return row[0];
  } catch (e) {
    console.error('error', e.message);
  }
}

module.exports = {
  getUser,
}