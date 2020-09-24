const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.username)) {
    errors = {message: {msgBody: "Name field is required", msgError: true}};
    return {errors, isValid: isEmpty(errors)};
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors = {message: {msgBody: "Password field is required", msgError: true}};
    return {errors, isValid: isEmpty(errors)};
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};