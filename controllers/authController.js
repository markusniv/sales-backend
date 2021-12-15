'use strict';

/*
 * Controller handling the login and register functionality via Passport
 */

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {httpError, controllerError} = require("../utils/errors");
const {addUser} = require("../models/userModel");

// LOGIN
const login = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      next(httpError('username / password incorrect', 400));
      return;
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        next(httpError('login error', 400));
        return;
      }
    });
    const token = jwt.sign(user, process.env.JWT_SECRET);
    return res.json({user, token});
  })(req, res, next);
};

/* REGISTER
 *
 * Without using .then with the password hashing, the password would end up undefined when sending the POST to the server
 * as the hashing wouldn't be complete yet. Could not find a better fix.
 */
const register = async (req, res, next) => {
  if (controllerError('user_post validation', req, next)) return;
  hashPassword(req.body.passwd)
    .then(async (password) => {
      const params = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        passwd: password
      };
      console.log(params);
      const result = await addUser(params, next);
      if (result.insertId) {
        res.json({message: `User added`, user_id: result.insertId});
      } else {
        res.status(400).json({error: 'register error'});
      }
    })
};

// LOGOUT
const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

// PASSWORD HASHING
const hashPassword = async (txtPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(txtPassword, salt);
}

module.exports = {
  login,
  register,
  logout,
  hashPassword
};