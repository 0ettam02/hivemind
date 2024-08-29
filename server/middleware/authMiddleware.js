const jwt = require('jsonwebtoken');
const JWT_SECRET = 'N86004402';

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
