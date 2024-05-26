const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '# Enhanced Authentication API',
    version: '1.0.0',
    description: 'API documentation for Voosh Enhanced Authentication API',
  },
  servers: [
    {
      url: 'https://bookish-goggles-w5r6q65qp5j2q77-3000.app.github.dev/api/auth/', // Update with your server URL
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to your API route files
  security: [
    {
      bearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

module.exports = swaggerJSDoc(options);
