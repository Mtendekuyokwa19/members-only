
const bcrypt = require("bcryptjs")
const { body } = require("express-validator");
const LocalStrategy = require('passport-local');
const { getuserbyusername } = require("../controller/get");
function authSignup() {
  return [body("firstname").notEmpty(), body("lastname").notEmpty(), body("username").notEmpty(), body("password").notEmpty()]
}
function authSignupPassword(req, res, next) {

  return
}
function validate(error, res) {

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
const authlogin = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await getuserbyusername(username)
    const compareuser = await bcrypt.compare(password, user.password);
    if (user == undefined) {
      return done(null, false, { message: "user not existed" })
    }
    else if (!compareuser) {

      return done(null, false, { message: "password is wrong" })
    }
    return done(null, user)
  } catch (error) {
    console.log(error)
  }
})

module.exports = { defaultsignupobject, authSignup, authSignupPassword, validate, authlogin }
