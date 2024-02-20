const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, "your-secret-key", { expiresIn: "1h" });
  return token;
};

module.exports = { generateToken };
