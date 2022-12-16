const express = require('express');
const app=express();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

app.use('/api-docs',
         swaggerUI.serve,
         swaggerUI.setup(swaggerDocument)
        );


console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)


module.exports = app;