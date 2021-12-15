const { check } = require('express-validator');

/*
 * Validator for comment insertion
 */

exports.validateComment = [
  check('comment')
    .trim()
    .escape(),
]