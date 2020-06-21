const express = require("express");
const db = require("../rickandmorty/dbModel");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const characters = await db.get();

    res.status(200).json(characters);
  } catch {
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

server.post("/", async (req, res) => {
  try {
    const character = await db.add(req.body);

    res.status(201).json(character);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add character" });
  }
});

server.delete("/:id", async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);

    res.status(202).json(deleted);
  } catch {
    res.status(500).json({ error: "Failed to delete character" });
  }
});

module.exports = server;
