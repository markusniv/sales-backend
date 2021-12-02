const { check } = require('express-validator');

exports.validateSearchQuery = [
  check('searchParam')
    .trim()
    .escape(),
]