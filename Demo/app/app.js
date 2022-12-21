const express = require('express');
const app=express();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
require('dotenv').config();

app.use('/api-docs',
         swaggerUI.serve,
         swaggerUI.setup(swaggerDocument)
        );


const utente = require('./controllers/utente');
const farmaco = require('./controllers/farmaco');
const visita = require('./controllers/visita');
const farmacia = require('./controllers/farmacia');
const luogo = require('./controllers/luogo');
const acquisto = require('./controllers/acquisto');
const ricetta = require('./controllers/ricetta');
const chat = require('./controllers/chat');
const authentication = require('./authentication');
app.use(express.json());
app.use('/utente', utente);
// app.use('/utente/autenticato', tokenChecker);

app.use('/farmaco', farmaco);
app.use('/visita', visita);
app.use('/luogo', luogo);
app.use('/farmacia', farmacia);
app.use('/acquisto', acquisto);
app.use('/ricetta', ricetta);
app.use('/chat', chat);
app.use('/authentication', authentication);
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)


module.exports = app;