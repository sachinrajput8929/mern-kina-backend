const jwt = require('jsonwebtoken');

function authOptional(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: payload.id }; // adapt to your JWT payload
    } catch (e) { /* invalid token -> treated as guest */ }
  }
  next();
}

function requireAuth(req, res, next) {
  authOptional(req, res, () => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    next();
  });
}

module.exports = { authOptional, requireAuth };
