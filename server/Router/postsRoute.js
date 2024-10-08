const express = require("express");
const router = express.Router();
const pool = require("../database");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMiddleware'); 

const SaltRounds = 10;
const JWT_SECRET = 'N86004402';

router.get("/card", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.*, 
             COUNT(likes.id) AS like_count, 
             COUNT(dislike.id) AS dislike_count
      FROM posts
      LEFT JOIN likes ON posts.id = likes.idpost
      LEFT JOIN dislike ON posts.id = dislike.idPost
      GROUP BY posts.id
      ORDER BY like_count DESC, dislike_count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/insertPost", authenticateToken, async (req, res) => {
  try {
    const userid = req.user.userId
    const { descrizione, title, tag } = req.body;
    const result = await pool.query(
      "INSERT INTO posts (descrizione, title, tag, userid) VALUES ($1, $2, $3, $4) RETURNING *",
      [descrizione, title, tag, userid]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/comment/:id",authenticateToken, async (req, res) => {
  try {
    const userid = req.user.userId
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
      "INSERT INTO commenti (testo, idPost, userid) VALUES ($1, $2, $3) RETURNING *",
      [testo, idPost, userid]
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

router.get("/reqComment/:id",authenticateToken, async (req, res) => {
  try {
    const userid = req.user.userId
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

router.put("/like/",authenticateToken, async (req, res) => {
  try {
    const userid = req.user.userId
    const { postId } = req.body;
    let result;
    
    const deleted = await pool.query(
      "SELECT COUNT(id) FROM likes WHERE idPost = ($1) AND idUser = ($2)",
      [postId, userid]
    );
    console.log(deleted.rows[0].count);
    if (deleted.rows[0].count == 0) {
      const cancellaDislike = await pool.query("DELETE FROM dislike WHERE idPost = ($1) AND idUser = ($2)", 
        [postId, userid]
      )
      const result = await pool.query(
        "INSERT INTO likes (idPost, idUser) VALUES ($1,$2)",
        [postId, userid]
      );
    } else {
      const result = await pool.query(
        "DELETE FROM likes WHERE idPost = ($1) AND idUser = ($2)",
        [postId, userid]
      );
    }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.put("/dislike", authenticateToken, async (req, res) => {
  try {
    const userid = req.user.userId
    const { postId } = req.body;
    let result;
    
    const deleted = await pool.query(
      "SELECT COUNT(id) FROM dislike WHERE idPost = ($1) AND idUser = ($2)",
      [postId, userid]
    );
    console.log(deleted.rows[0].count);
    if (deleted.rows[0].count == 0) {
      const cancellaLike = await pool.query("DELETE FROM likes WHERE idPost = ($1) AND idUser = ($2)", 
        [postId, userid]
      )
      const result = await pool.query(
        "INSERT INTO dislike (idPost, idUser) VALUES ($1,$2)",
        [postId, userid]
      );
    } else {
      const result = await pool.query(
        "DELETE FROM dislike WHERE idPost = ($1) AND idUser = ($2)",
        [postId, userid]
      );
    }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/likeCrescenti", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.*, COUNT(likes.id) AS like_count
      FROM posts
      LEFT JOIN likes ON posts.id = likes.idpost
      GROUP BY posts.id
      ORDER BY like_count ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/likeDecrescenti", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.*, COUNT(likes.id) AS like_count
      FROM posts
      LEFT JOIN likes ON posts.id = likes.idpost
      GROUP BY posts.id
      ORDER BY like_count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.get("/showLike/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT COUNT(*) AS mipiace FROM likes WHERE idpost = $1", 
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.get("/showDislike/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT COUNT(*) AS nonmipiace FROM dislike WHERE idpost = $1", 
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/registrazione", async(req, res) => {
  try {
    const { username, password, nome, cognome, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, SaltRounds)
    const result = await pool.query("INSERT INTO users (username, password, nome, cognome, email) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [username, hashedPassword, nome, cognome, email]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;

