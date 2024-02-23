const bcrypt = require("bcrypt");

const conn = require("../db/db");
const { registerUser, loginUser, ifEmailExists } = require("../db/userDB");
const { generateToken } = require("../shared/auth");
const { registerSchema, loginSchema } = require('../validation/userValidation');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = await registerSchema.validateAsync(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailCheck = await ifEmailExists(conn, email);
    console.log("emailCheck",emailCheck)

    if (!emailCheck) {
      let registerData = await registerUser(
        conn,
        username,
        email,
        hashedPassword
      );
      res.status(200).send({
        status_code: 200,
        message: "User registered successfully!",
        data: registerData,
      });
    } else {
      return res.status(400).send({
        status_code: 400,
        message: "Failed to register user,duplicate entry!",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status_code: 500, message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);

    const user = await loginUser(conn, email, password);

    if (!user) {
      return res.status(401).send({
        status_code: 401,
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user);
    
    return res.status(200).send({
      status_code: 200,
      message: "Login successful",
      token: token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status_code: 500,
      message: "Internal server error"
    });
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
