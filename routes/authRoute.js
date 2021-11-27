'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validateUser} = require("../validators/userValidator");

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', validateUser, authController.register);

module.exports = router;