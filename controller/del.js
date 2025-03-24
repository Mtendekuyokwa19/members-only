const pool = require("../db/pool.js");

async function removeMessage
  (id) {
  await pool.query(
    "DELETE FROM messages WHERE messages.id=$1",
    [id],
  );
}
module.exports = {
  removeMessage
}
