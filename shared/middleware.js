// const jwt = require("jsonwebtoken");
// const secretKey = "your-secret-key";

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Authorization token not provided" });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = {
//   verifyToken,
// };
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // This should be a secret key used to sign your JWT tokens

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token not provided" });
  }

  // Extract the token from the Authorization header (Bearer token)
  const tokenParts = token.split(" ");
  const tokenType = tokenParts[0]; // Bearer
  const authToken = tokenParts[1]; // Token value

  if (tokenType !== "Bearer" || !authToken) {
    return res
      .status(401)
      .json({ message: "Invalid authorization token format" });
  }

  // Verify the token using the secret key
  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Call the next middleware function
  });
};

module.exports = { verifyToken };
