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

const ifEmailExists = (conn) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT email FROM users", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

const loginUser = (conn, email) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
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

module.exports = {
  registerUser,
  ifEmailExists,
  loginUser,
};
