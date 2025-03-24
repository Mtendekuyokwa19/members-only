const { Router } = require("express");

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs")
require("dotenv").config()
const { body, validationResult } = require("express-validator");
const { adduser } = require("../controller/insert");
const { authSignup, authSignupPassword, validate, defaultsignupobject, authlogin } = require("./auth");
const { getuserbyusername, getMessagesWithUsers, getUserbyId } = require("../controller/get");
const passport = require("passport");
const router = Router()

passport.use(authlogin)
router.get("/", (req, res, next) => {
  getMessagesWithUsers().then(messages => {

    res.render("index", { messages: messages })

  })

})

router.get("/signup", (req, res, next) => {


  res.render("signup", { error: "", form: defaultsignupobject })
})

router.get("/login", (req, res, next) => {

  res.render("login", { error: "", form: defaultsignupobject })

})
//TODO: make sure that usernames do not get repeated who have
router.post("/login", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login" }))

router.post("/signup", body('confirm_password').custom((value, { req, res }) => {
  console.log(value == req.body.password)

  if (value !== req.body.password) {
    throw new Error("password do not match")
  }

  return true

}), authSignup()
  , async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log(req.body)
      res.render("signup", { error: `${errors.errors[0].msg}:  ${errors.errors[0].path}`, form: req.body })
      return
    }
    try {

      const user = req.body
      const password = await bcrypt.hash(req.body.password, 10)
      getuserbyusername(user.username).then((account => {
        if (account == undefined) {

          adduser(user.firstname, user.lastname, user.username, password)

          res.render("login", { error: "", form: defaultsignupobject })
          return
        }

        res.render("signup", { error: "username already exits", form: req.body })
      }))
    } catch (error) {
      console.log(error)
    }


  })
passport.serializeUser((user, done) => {

  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {

    const user = getUserbyId(id)
    return done(null, user)

  }
  catch (err) {
    done(err)
  }
})

module.exports = { router }
