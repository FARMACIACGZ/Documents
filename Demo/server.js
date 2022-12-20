const dotenv = require('dotenv').config();
const express = require('express');
const app= express();
const app2 = require('./app.js');

const utente = require('./app/utente');
const farmaco = require('./app/farmaco');
const visita = require('./app/visita');
const farmacia = require('./app/farmacia');
const luogo = require('./app/luogo');
const acquisto = require('./app/acquisto');
const ricetta = require('./app/ricetta');
const chat = require('./app/chat');
const authentication = require('./app/authentication');

const mongoose = require('mongoose');
app.use(express.json());
app.use('/utente', utente);
app.use('/farmaco', farmaco);
app.use('/visita', visita);
app.use('/luogo', luogo);
app.use('/farmacia', farmacia);
app.use('/acquisto', acquisto);
app.use('/ricetta', ricetta);
app.use('/chat', chat);
app.use('/api/v1/authentications', authentication);
app.use(app2);


mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT|| 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})




