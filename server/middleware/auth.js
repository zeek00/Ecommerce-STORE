const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.session.user = decoded;
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).send("Invalid Token");
  }
  if (!req.session || !req.session.user) {
    console.error("User session or token is missing");
    return res.status(403).send("User session or token is missing");
  }
  return next();
};

module.exports = verifyToken;