'use strict';

const userModel = require("../models/userModel");
const {httpError, controllerError} = require("../utils/errors");
const {getUserLogin, modifyUser} = require("../models/userModel");
const bcrypt = require("bcryptjs");
const {hashPassword} = require("./authController");
const {makeThumbnail} = require("../utils/thumbnail");
const {getAllUsers, getUser} = require("../utils/functions");

const getUserLogged = async (req, res, next) => {
  await getUser(req, res, next);
}

const getAllUsersLogged = async (req, res, next) => {
  await getAllUsers(req, res, next);
}

const putUserPw = async (req, res, next) => {
  console.log(req.body);
  if (controllerError('user_put validation', req, next)) return;
  await getUserLogin([req.user.email]).then(async user => {
    await checkPassword(req, next, user).then(async result => {
      if (result) {
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

const putUserNoPw = async (req, res, next) => {
  if (controllerError('user_put validation', req, next)) return;
  await getUserLogin([req.user.email]).then(async user => {
    await checkPassword(req, next, user).then(async result => {
      console.log("checked password succesfully, result is = " + result);
      if (result) {
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

const modProfilePic = async (req, res, next) => {
  try {
    const filename = req.file.filename;
    const thumb = await makeThumbnail(req.file.path, filename);
    const response = await userModel.modifyProfilePic(filename, req.user, next);
    if (!thumb) {
      res.json({message: 'profile pic add failed', error: response});
    }
  } catch (e) {
    const err = httpError('Failed to add profile picture', 400);
    next(err);
    return;
  }
}

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

const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('token not valid'));
  } else {
    res.json({user: req.user});
  }
}

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
  getUserLogged,
  getAllUsersLogged,
  putUserPw,
  putUserNoPw,
  checkToken,
}