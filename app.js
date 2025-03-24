const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config()
const { router } = require("./routes/route");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const app = express();

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }))
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", router);
app.use("/login", router);
app.use("/signup", router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(8011);
