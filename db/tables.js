const pool = require("../db/pool.js")
const fs = require("node:fs")
const path = require("path")
function createTables() {
  const fs = require('node:fs/promises');

  async function maketable() {
    try {
      const data = await fs.readFile(path.resolve(__dirname, 'tables.sql'), { encoding: 'utf8' });
      await pool.query(data);
    } catch (err) {
      console.error(err);
    }
  }
  maketable()

}

createTables()
