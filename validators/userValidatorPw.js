const { check } = require('express-validator');

/*
 * Validator for user creation and modification with new password
 */

exports.validateUserPw = [
  check('first_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First name cannot be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('last_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last name cannot be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address!')
    .bail(),
  check('passwd')
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password needs to be at least 8 characters")
    .matches(/(?=.*[A-Z])/)
    .withMessage('Password needs to contain one capital letter!')
    .bail(),
];