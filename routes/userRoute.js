'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {validateUserPw} = require("../validators/userValidatorPw");
const {validateUserNoPw} = require("../validators/userPutValidatorNoPw");

router.route("/")
  .get(userController.getAllUsers)
  .put(validateUserNoPw, userController.putUserNoPw);

router.route('/pw')
  .put(validateUserPw, userController.putUserPw);

router.route('/:id')
  .get(userController.getUser);

module.exports = router;