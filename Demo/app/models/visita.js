const mongoose = require("mongoose"); //import mongoose

// tea schema
const visitaSchema = new mongoose.Schema({
    
    data : Date,
    utenteId: String,
    medicoId: String,
    descrizione: String



});

const visita = mongoose.model('visita', visitaSchema); //convert to model named Tea
module.exports = visita; //export for controller use
