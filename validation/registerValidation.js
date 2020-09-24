const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors = {message: {msgBody: "Name field is required", msgError: true}};
    return {errors, isValid: isEmpty(errors)};
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors = {message: {msgBody: "Password field is required", msgError: true}};
    return {errors, isValid: isEmpty(errors)};
  }

  if (Validator.isEmpty(data.password2)) {
    errors = {message: {msgBody: "Confirm password field is required", msgError: true}};
    return {errors, isValid: isEmpty(errors)};
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors = {message: {msgBody: "Password must be at least 6 characters", msgError: true}};
    return {errors, isValid: isEmpty(errors)};
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors = {message: {msgBody: "Passwords must match", msgError: true}};
    return {errors, isValid: isEmpty(errors)};
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
