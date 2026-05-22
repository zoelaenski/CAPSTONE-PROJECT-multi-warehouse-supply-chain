const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Multi-Warehouse Supply Chain API",
      version: "1.0.0",
      description: "API documentation for warehouse system",
    },
    servers: [
  {
    url: "http://localhost:5000",
  },
],

components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
  },

  // This tells Swagger where to scan for routes
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;