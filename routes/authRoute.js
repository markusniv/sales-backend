'use strict';

/*
 * Routes for authentication functionality
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validateUserPw} = require("../validators/userValidatorPw");

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', validateUserPw, authController.register);

module.exports = router;