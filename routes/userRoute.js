'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({
  dest: './uploads/',
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif') {
      return callback(new Error('Only images of .png, .jpg and .gif type are allowed!'))
    }
    callback(null, true)
  }});
const {validateUserPw} = require("../validators/userValidatorPw");
const {validateUserNoPw} = require("../validators/userPutValidatorNoPw");
const path = require("path");

router.route("/")
  .get(userController.getAllUsers)
  .put(upload.single('profile_pic'), validateUserNoPw, userController.putUserNoPw);

router.route('/pw')
  .put(upload.single('profile_pic'), validateUserPw, userController.putUserPw);

router.route('/:id')
  .get(userController.getUser);

module.exports = router;