const { verifyToken } = require("../utils/JWT");

const validationToken = (req, res, next) => {
  const { originalUrl } = req;
  const { authorization } = req.headers;

  // New validation
  if (!authorization && originalUrl === '/user/register') return next();
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const user = verifyToken(authorization);
  req.user = { ...user };
  next();  
}

module.exports = validationToken;