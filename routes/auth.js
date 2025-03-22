
const { body, validationResult } = require("express-validator");

function authSignup() {
  const firstname = body("firstname").notEmpty()
  const lastname = body("lastname").notEmpty()
  const username = body("username").notEmpty()
  return [body("firstname").notEmpty(), body("lastname").notEmpty(), body("username").notEmpty(), body("password").notEmpty()]
}
function authSignupPassword(req, res, next) {

  return
}
function validate(error, res) {

  console.log(error.errors)
  if (!error.isEmpty()) {

    error = error.errors

    return {
      status: true, error: `${error[0].msg} on ${error[0].path}`
    }

  }
  return { status: false }

}

let defaultsignupobject = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  confirm_password: ""
}
module.exports = { defaultsignupobject, authSignup, authSignupPassword, validate }
