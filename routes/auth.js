
const { body, validationResult } = require("express-validator");

async function authSignup(req, res, next) {
  const firstname = body("firstname").notEmpty()
  const lastname = body("lastname").notEmpty()
  const username = body("username").notEmpty()
  return [firstname, lastname, username]
}
async function authSignupPassword(req, res, next) {
  body('confirm_password').custom(value => {
    return value == req.body.password
  })
  next()


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


module.exports = { authSignup, authSignupPassword, validate }
