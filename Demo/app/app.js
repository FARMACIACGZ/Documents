const express = require('express');
const app=express();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const cors = require('cors')
const router = express.Router();
require('dotenv').config();



//REQUIRE
const utente = require('./controllers/utente');
const farmaco = require('./controllers/farmaco');
const visita = require('./controllers/visita');
const luogo = require('./controllers/luogo');
const acquisto = require('./controllers/acquisto');
const ricetta = require('./controllers/ricetta');
const chat = require('./controllers/chat');
const tokenChecker = require('./tokenChecker.js');
const authentication = require('./authentication.js');



app.use(express.static(process.env.FRONTEND || 'static'));
// If process.env.FRONTEND folder does not contain index.html then use the one from static
app.use(express.static('static')); // expose also this folder
app.use((req, res, next) => {
        console.log(req.method + ' ' + req.url+ ' '+ req.headers)
        next()
})



//USE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/utente', utente);
app.use('/farmaco', farmaco);
app.use('/authentication', authentication);
// app.use('/luogo', tokenChecker);

app.use('/luogo', luogo);


app.use('/visita', visita);
app.use('/acquisto', acquisto);
app.use('/ricetta', ricetta);
app.use('/chat', chat);

app.use('/api-docs',
        swaggerUI.serve,
        swaggerUI.setup(swaggerDocument)
);

app.use((req, res) => {
        res.status(404);
        res.json({ error: 'Not found' });
});






console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)


module.exports = app;