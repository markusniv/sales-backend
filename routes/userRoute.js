'use strict'

/*
 * Routes for non-authenticated user functionality
 */

const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/")
  .get(userController.getAllUsers);

router.route('/:id')
  .get(userController.getUser);

module.exports = router;