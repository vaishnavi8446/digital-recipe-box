const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token not provided" });
  }

  const tokenParts = token.split(" ");
  const tokenType = tokenParts[0];
  const authToken = tokenParts[1];

  if (tokenType !== "Bearer" || !authToken) {
    return res
      .status(401)
      .json({ message: "Invalid authorization token format" });
  }

  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
