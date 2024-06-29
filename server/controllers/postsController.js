// const pool = require('../server/database');

// // Funzione per ottenere tutti i post
// exports.getAllPosts = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM posts');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// };

// // Funzione per inserire un nuovo post
// exports.createPost = async (req, res) => {
//   try {
//     const { descrizione, title } = req.body;
//     const result = await pool.query(
//       'INSERT INTO posts (descrizione, title) VALUES ($1, $2) RETURNING *',
//       [descrizione, title]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// };