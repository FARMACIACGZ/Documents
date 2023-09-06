// Importa il modulo 'dotenv' per la gestione delle variabili d'ambiente
const dotenv = require('dotenv').config();

// Importa il modulo 'express' per la creazione del server
const express = require('express');

// Importa il modulo 'app.js' dalla cartella 'app'
const app2 = require('./app/app.js');

// Crea un'applicazione Express
const app = express();

// Importa il modulo 'mongoose' per la connessione a MongoDB
const mongoose = require('mongoose');

// Configura l'app Express utilizzando l'app da './app/app.js'
app.use('', app2);

// Connessione a MongoDB utilizzando la variabile d'ambiente 'DB_URL'
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Errore: ", err);
        console.log("Connessione MongoDB -- Lo stato è:", mongoose.connection.readyState);
    }
);

// Avvia il server Express sulla porta specificata dalle variabili d'ambiente o sulla porta predefinita 3000
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('La tua app è in ascolto sulla porta ' + listener.address().port);
});
