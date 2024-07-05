const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/card", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/insertPost", async (req, res) => {
  try {
    const { descrizione, title, tag } = req.body;
    const result = await pool.query(
      "INSERT INTO posts (descrizione, title, tag) VALUES ($1, $2, $3) RETURNING *",
      [descrizione, title, tag]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/comment/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { testo } = req.body;
    const idPost = req.params.id;

    const postExists = await pool.query("SELECT * FROM posts WHERE id = $1", [
      idPost,
    ]);

    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const result = await pool.query(
      "INSERT INTO commenti (testo, idPost) VALUES ($1, $2) RETURNING *",
      [testo, idPost]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/whitepage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/reqComment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM commenti WHERE idPost = $1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { miPiace, nonMiPiace } = req.body;

    const result = await pool.query(
      "UPDATE posts SET miPiace = $1, nonMiPiace = $2 WHERE id = $3 RETURNING *",
      [miPiace, nonMiPiace, id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/dislike/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { miPiace, nonMiPiace } = req.body;

    const result = await pool.query(
      "UPDATE posts SET miPiace = $1, nonMiPiace = $2 WHERE id = $3 RETURNING *",
      [miPiace, nonMiPiace, id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/likeDecrescenti", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY miPiace DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/likeCrescenti", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY miPiace ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.get("/showLike/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT miPiace FROM posts WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/showDislike/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT nonMiPiace FROM posts WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
