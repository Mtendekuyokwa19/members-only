const express = require("express");
const { router } = require("./routes/route");
const path = require("path");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.use("/", router);
app.use("/login", router);
app.use("/signup", router);


//TODO: add error checking here
app.use(express.urlencoded({ extended: true }))
app.listen(8011);
