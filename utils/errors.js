'use strict';
const {validationResult} = require("express-validator");

const httpError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const msgCreator = (array) => {
  let messages = "";
  for (let i = 0; i < array.length; i++) {
    messages += array[i].msg + "\n\n"
  }
  return messages;
}

/**
 * Function to create a clear single error message from all the possible validation errors happening during post/put
 *
 * @param type Where the error happened, e.g. 'postUser validation'
 * @param req The input sent by the user for the post/put
 * @param next
 * @returns {boolean} Returns true/false, indicating for the controller whether to continue the process or not.
 */
const controllerError = (type, req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(type, errors.array());
    const err = httpError(msgCreator(errors.array()), 400);
    next(err);
    return true;
  }
}

module.exports = {
  httpError,
  controllerError,
}
