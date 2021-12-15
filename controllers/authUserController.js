'use strict';

/*
 * Controller handling everything regarding the user functionality that requires authentication via the bearer token
 */

const userModel = require("../models/userModel");
const {httpError, controllerError} = require("../utils/errors");
const {getUserLogin, modifyUser} = require("../models/userModel");
const bcrypt = require("bcryptjs");
const {hashPassword} = require("./authController");
const {makeThumbnail} = require("../utils/thumbnail");

// PUT - Sends a PUT with a new password when the user wants to change his password
const putUserPw = async (req, res, next) => {
  console.log(req.body);
  if (controllerError('user_put validation', req, next)) return;
  await getUserLogin([req.user.email]).then(async user => {
    await checkPassword(req, next, user).then(async result => {
      if (result) {
        // If image sent, change profile pic
        if (req.file) {
          await modProfilePic(req, res, next);
        }
        hashPassword(req.body.passwd)
          .then(async (password) => {
            const params = {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              passwd: password
            };
            await mod(params, req, res, next);
          })
      }
    })
  })
};

// PUT - Sends a PUT without a new password when the user just wants to edit his other information
const putUserNoPw = async (req, res, next) => {
  if (controllerError('user_put validation', req, next)) return;
  await getUserLogin([req.user.email]).then(async user => {
    await checkPassword(req, next, user).then(async result => {
      console.log("checked password succesfully, result is = " + result);
      if (result) {
        // If image sent, change profile pic
        if (req.file) {
          await modProfilePic(req, res, next);
        }
        const params = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
        };
        await mod(params, req, res, next);
      }
    })
  })
};

// PUT for profile pic filename only
const modProfilePic = async (req, res, next) => {
  try {
    const filename = req.file.filename;
    const thumb = await makeThumbnail(req.file.path, filename);
    const response = await userModel.modifyProfilePic(filename, req.user, next);
    if (!thumb) {
      res.json({message: 'Profile picture add failed!', error: response});
    }
  } catch (e) {
    const err = httpError('Failed to add profile picture', 400);
    next(err);
    return;
  }
}

// Generic function for the PUT
const mod = async (params, req, res, next) => {
  console.log("starting user modification...");
  const response = await modifyUser(req.user, params, next);
  if (response.affectedRows) {
    res.json({message: "Successfully modified user!"});
    return;
  }
  const err = httpError("Failed to modify user", 400);
  next(err);
}

// Bearer token check
const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('token not valid'));
  } else {
    res.json({user: req.user});
  }
}

// Using bcrypt to compare sent password with the hashed one in the database
const checkPassword = async (req, next, user) => {
  console.log('checking password', user);
  const result = await bcrypt.compare(req.body.old_passwd, user[0].passwd);
  if (!result) {
    const err = httpError("Please confirm your password and try again!", 400);
    next(err);
  }
  return result;
}

module.exports = {
  putUserPw,
  putUserNoPw,
  checkToken,
}