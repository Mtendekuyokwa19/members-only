const { Router } = require("express");
const bcrypt = require("bcryptjs")
require("dotenv").config()
const { body, validationResult } = require("express-validator");
const { adduser } = require("../controller/insert");
const { authSignup, authSignupPassword, validate, defaultsignupobject } = require("./auth");
const router = Router()

router.get("/", (req, res, next) => {

  res.render("index")

})

router.get("/signup", (req, res, next) => {


  res.render("signup", { error: "", form: defaultsignupobject })
})
router.get("/login", (req, res, next) => {


  res.render("login")
})

router.post("/signup", body('confirm_password').custom((value, { req, res }) => {
  console.log(value == req.body.password)

  if (value !== req.body.password) {
    throw new Error("password do not match")
  }

  return true

}), authSignup()
  , async (req, res) => {
    //FIX: make sure to r  eturn the auth middleware
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render("signup", { error: `${errors.errors[0].msg}:  ${errors.errors[0].path}`, form: req.body })
      return
    }
    try {

      const user = req.body
      const password = await bcrypt.hash(req.body.password, 10)
      await adduser(user.firstname, user.lastname, user.username, password)
      res.redirect("/")
    } catch (error) {
      console.log(error)
    }


  })

module.exports = { router }
