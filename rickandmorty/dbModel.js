const db = require("../data/dbConfig");

module.exports = { get, getById, add, remove };

function get() {
  return db("characters");
}

function getById(id) {
  //
}

async function add(char) {
  const [id] = await db("characters").insert(char);

  return await db("characters")
    .where({ id })
    .first();
}

function remove(id) {
  return db("characters")
    .where({ id })
    .del();
}
