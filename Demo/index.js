// Importa il modulo 'app.js' dalla cartella 'app'
const app = require('./app/app.js');

// Importa il modulo 'mongoose'
const mongoose = require('mongoose');

/**
 * Configura la porta del server.
 * Utilizza la variabile d'ambiente PORT fornita da Heroku, 
 * altrimenti utilizza la porta predefinita 8080.
 * Per ulteriori informazioni, consulta la guida Heroku qui:
 * https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
 */
const port = process.env.PORT || 8080;

/**
 * Configura Mongoose, un ODM (Object Data Modeling) per MongoDB.
 * Nota: Al momento la configurazione effettiva di Mongoose manca in questo snippet.
 */
// mongoose.Promise = global.Promise;

// Importa il modulo 'server.js'
const server = require('./server.js');

// Avvia il server
server.listener;
