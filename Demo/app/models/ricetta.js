const mongoose = require("mongoose"); //import mongoose

// tea schema
const ricettaSchema = new mongoose.Schema({

    data_ricetta: String,
    quantita: Number,
    dose: Number,
    periodo_inizio: Date,
    periodo_fine: Date,
    farmacoNome: String,
    descrizione: String,
    visitaId: String




});

const ricetta = mongoose.model('ricetta', ricettaSchema); //convert to model named Tea
module.exports = ricetta; //export for controller use
