const { Router } = require("express");

const bcrypt = require("bcryptjs")
require("dotenv").config()
const { body, validationResult } = require("express-validator");
const { adduser, newMessage } = require("../controller/insert");
const { authSignup, authSignupPassword, validate, defaultsignupobject, authlogin } = require("./auth");
const { getuserbyusername, getMessagesWithUsers, getUserbyId, getClubPassword } = require("../controller/get");
const passport = require("passport");
const { becomeAmember } = require("../controller/update");
const { removeMessage } = require("../controller/del");
const router = Router()

passport.use(authlogin)
passport.serializeUser((user, done) => {

  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {

    const user = await getUserbyId(id)

    return done(null, user)

  }
  catch (err) {
    done(err)
  }
})
router.get("/member", (req, res, next) => {
  if (req.user) {

    res.render("member", { error: "" })
    return
  }
  res.redirect("/")

})
router.post("/member", (req, res, next) => {
  getClubPassword().then(async (password) => {
    if (req.body.password == password) {
      await becomeAmember(req.user.id)
      res.redirect("/")
      return
    }
    res.render("member", { error: "wrong club code" })
  })
})
router.get("/", (req, res, next) => {
  getMessagesWithUsers().then(messages => {
    res.render("index", { messages: messages, user: req.user })

  })

})
router.get("/delete/:id", async (req, res, next) => {
  if (req.user) {
    if (req.user.user_type == 1) {
      await removeMessage(req.params.id)
      res.redirect("/")
      return
    }

  }

  res.redirect("/")
})
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {

      return next(err)
    }
    res.redirect("/")
  })

})
router.get("/signup", (req, res, next) => {


  res.render("signup", { error: "", form: defaultsignupobject })
})

router.get("/login", (req, res, next) => {

  res.render("login", { error: "", form: defaultsignupobject })

})
//TODO: make sure that usernames do not get repeated who have
//TODO: wrte sql for creating the tables
//FIX: remove all console logging messages
router.post("/login", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login" }))


router.post("/newmessage", async (req, res, next) => {
  await newMessage(req.user.id, req.body.textmessage, new Date())
  res.redirect("/")
})
router.post("/signup", body('confirm_password').custom((value, { req, res }) => {

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
