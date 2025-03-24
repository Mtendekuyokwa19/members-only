const pool = require("../db/pool.js")
async function getuserbyusername(username) {
  const user = await pool.query("SELECT * FROM users WHERE username=$1", [username])

  return user.rows[0]
}
async function getUserbyId(id) {
  const user = await pool.query("SELECT * FROM users WHERE users.id=$1", [id])
  console.log(user.rows[0])
  return user.rows[0]
}

async function getMessagesWithUsers() {
  const messages = await pool.query("SELECT text,date,username,firstname FROM messages JOIN  users ON users.id=messages.userid  ")

  return messages.rows
}
async function getClubPassword() {

  const password = await pool.query("SELECT * FROM club_password")
  console.log(password.rows)
  return password.rows

}
getClubPassword()
module.exports = {
  getuserbyusername,
  getMessagesWithUsers,
  getUserbyId,
  getClubPassword

}
