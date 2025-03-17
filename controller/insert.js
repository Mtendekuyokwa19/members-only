const pool = require("../db/pool.js");

async function adduser(
  firstname,
  lastname,
  username,
  password

) {
  await pool.query(
    "INSERT INTO users (firstname,lastname,username,password,user_type) VALUES ($1,$2,$3,$4,$5);    ",
    [firstname, lastname, username, password, 2],
  );
}
module.exports = {
  adduser
}
