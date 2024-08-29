const express = require("express");
const router = express.Router();
const pool = require("../database");

router.post("/registrazione", async(req, res) => {
    try {
      const { username, password, nome, cognome, email } = req.body;
      const result = await pool.query("INSERT INTO users (username, password, nome, cognome, email) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [username, password, nome, cognome, email]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });