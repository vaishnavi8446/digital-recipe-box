const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const port = 3000;

const app = express();
//set the template engine
app.set("view engine", "ejs");
//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));
//static folder
app.use(express.static(path.resolve(__dirname, "file")));

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/user", userRoutes);
app.use("/recipe", recipeRoutes);
app.use("/notification", notificationRoutes);
app.use("/uploads", uploadRoutes);

//route for Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Digital Recipe Box",
      version: "0.1.0",
      description:
        "This is Digital Recipe Box Backend made with Express and documented with Swagger",
      contact: {
        name: "Vaishnavi Ambolkar",
        url: "https://github.com/vaishnavi8446",
        email: "vaishnaviambolkar8446@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};


const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//assign port
app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = { app };
