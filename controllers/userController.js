const bcrypt = require("bcrypt");
const db = require("../db/db");


exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send({ status_code: 500, message: "Failed to register user" });
      }
      res
        .status(200)
        .send({ status_code: 200, message: "User registered successfully" });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send({ status_code: 500, message: "Internal server error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .send({ status_code: 401, message: "Invalid email or password" });
      }

      const user = results[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .send({ status_code: 401, message: "Invalid email or password" });
      }

      res.status(200).send({ status_code: 200, message: "Login successful" });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

// Retrieve user profile information
// exports.getUserProfile = async (req, res) => {
//     try {
//         const userId = req.user.id; // Assuming you have implemented authentication middleware

//         // Fetch user profile from the database
//         const sql = 'SELECT id, username, email FROM users WHERE id = ?';
//         db.query(sql, [userId], (error, results) => {
//             if (error) {
//                 console.error(error);
//                 return res.status(500).send({ message: 'Internal server error' });
//             }

//             if (results.length === 0) {
//                 return res.status(404).send({ message: 'User not found' });
//             }

//             const userProfile = results[0];
//             res.status(200).send({ userProfile });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// };
