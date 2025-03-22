const { Router } = require("express");
const bcrypt = require("bcryptjs")
require("dotenv").config()
const { body, validationResult } = require("express-validator");
const { adduser } = require("../controller/insert");
const { authSignup, authSignupPassword, validate, defaultsignupobject } = require("./auth");
const { getuserbyusername, getMessagesWithUsers } = require("../controller/get");
const router = Router()

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
router.post("/login", (req, res, next) => {
  const user = getuserbyusername(req.body.username).then(async (account) => {
    console.log(account, req.body.username)
    if (account == undefined) {
      res.render("login", { error: "Sorry, user do not exist", form: req.body })
      return
    }
    const passwordCheck = await bcrypt.compare(req.body.password, account.password)
    if (passwordCheck) {
      res.redirect("/")
      return
    }

    res.render("login", { error: "Sorry, wrong password", form: req.body })
  })


})

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

module.exports = { router }
