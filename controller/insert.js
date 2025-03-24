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
async function newMessage(userid, text, date) {
  await pool.query("INSERT INTO messages(userid,text,date) VALUES ($1,$2,$3)", [userid, text, date])
}
module.exports = {
  adduser,
  newMessage
}
