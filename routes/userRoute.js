'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {validateUser} = require("../validators/userValidator");

router.route("/")
  .get(userController.getAllUsers)

router.route('/:id')
  .get(userController.getUser)
  .put(validateUser, userController.putUser);

module.exports = router;