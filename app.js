const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/user", userRoutes);
app.use("/recipe", recipeRoutes);

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'recipe'
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Connected to MySQL database');
// });

// Define your routes and controller functions here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
