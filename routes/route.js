const { Router } = require("express");
const bcrypt = require("bcryptjs")
require("dotenv").config()
const { body } = require("express-validator");
const { adduser } = require("../controller/insert");
const router = Router()

router.get("/", (req, res, next) => {

  res.render("index")

})

router.get("/signup", (req, res, next) => {


  res.render("signup")
})
router.get("/login", (req, res, next) => {


  res.render("login")
})
router.post("/signup", async (req, res) => {
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
