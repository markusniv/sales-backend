const { check } = require('express-validator');

exports.validateListing = [
  check('title')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Title cannot be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!'),
  check('description')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Last name cannot be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!'),
  check('price')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Invalid price!')
];