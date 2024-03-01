const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Ecommerce Website",
        version: "0.1.0",
        description:
          "This is Ecommerce Website Backend made with Express and documented with Swagger",
        contact: {
          name: "Vaishnavi Ambolkar",
          url: "https://github.com/vaishnavi8446",
          email: "vaishnaviambolkar8446@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  console.log("op",options)

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
