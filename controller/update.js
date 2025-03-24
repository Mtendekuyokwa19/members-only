const pool = require("../db/pool.js")
async function becomeAmember(id) {

  await pool.query("UPDATE users SET member=true WHERE $1=users.id", [id])

}

module.exports = {
  becomeAmember,
}
