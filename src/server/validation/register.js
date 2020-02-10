const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
  const errors = {}

  data.fname = !isEmpty(data.fname) ? data.fname : ''
  data.lname = !isEmpty(data.lname) ? data.lname : ''
  data.username = !isEmpty(data.username) ? data.username : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if (Validator.isEmpty(data.fname)) {
    errors.name = 'First Name field is required'
  }
  
  if (Validator.isEmpty(data.lname)) {
    errors.name = 'Last Name field is required'
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required'
  } else if (!Validator.isAlphanumeric(data.username)) {
    errors.username = 'Username is invalid'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required'
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
