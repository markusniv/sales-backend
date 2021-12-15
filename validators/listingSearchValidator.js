const { check } = require('express-validator');

/*
 * Validator for listing searching
 */

exports.validateSearchQuery = [
  check('searchParam')
    .trim()
    .escape(),
]