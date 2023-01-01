const mongoose = require("mongoose"); //import mongoose

// tea schema
const farmacoSchema = new mongoose.Schema({
    
    name: String,
    modalitauso: String, 
    foglio_illustrativo: String,
    scadenza: Date,
    prezzo: Number,
    quantita: Number,
    luogoId: String

});

const farmaco = mongoose.model('farmaco', farmacoSchema); //convert to model named Tea
module.exports = farmaco; //export for controller use
