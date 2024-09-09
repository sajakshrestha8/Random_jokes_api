const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Blog API',
      description: 'APIs for random jokes to post and view ',
      contact: {
        name: 'Random jokes Api',
        email: 'info@miniblog.com',
        url: 'https://github.com/DesmondSanctity/node-js-swagger',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8080/',
        description: 'Local server',
      },
    ],
  },
  apis: ['./index.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = setupSwaggerDocs;
