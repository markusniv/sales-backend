const { check } = require('express-validator');

exports.validateComment = [
  check('comment')
    .trim()
    .escape(),
]