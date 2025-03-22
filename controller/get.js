const pool = require("../db/pool.js")
async function getuserbyusername(username) {
  const user = await pool.query("SELECT * FROM users WHERE username=$1", [username])

  return user.rows[0]
}

module.exports = {
  getuserbyusername
}
