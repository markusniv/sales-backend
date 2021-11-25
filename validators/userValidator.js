const { check } = require('express-validator');

exports.validateUser = [
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
    .matches(/(?=.*[A-Z])/)
    .withMessage('Password needs to be at least 8 characters long and contain one capital letter!')
    .bail(),
];