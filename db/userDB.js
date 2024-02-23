const bcrypt = require("bcrypt");

const registerUser = (conn, username, email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const ifEmailExists = (conn, email) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT COUNT(*) AS count FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const emailExists = results[0].count > 0;
          resolve(emailExists);
        }
      }
    );
  });
};


const loginUser = (conn, email, password) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            const user = results[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
              resolve(user);
            } else {
              resolve(null);
            }
          }
        }
      }
    );
  });
};


module.exports = {
  registerUser,
  ifEmailExists,
  loginUser,
};
