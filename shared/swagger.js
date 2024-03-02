const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Digital Recipe Box",
      version: "0.1.0",
      description:
        "This API powers the Digital Recipe Box backend, built with NodeJS, Express and documented using Swagger.",
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};


const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
