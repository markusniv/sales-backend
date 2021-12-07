const express = require('express');
const router = express.Router();
const userController = require("../controllers/userNonLoggedController");

router.route("/")
  .get(userController.getAllUsersNonLogged)

router.route('/:id')
  .get(userController.getUserNonLogged);

module.exports = router;