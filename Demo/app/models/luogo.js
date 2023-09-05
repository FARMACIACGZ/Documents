const mongoose = require("mongoose"); //import mongoose

// tea schema
const luogoSchema = new mongoose.Schema({
    
   nome: String,
   indirizzo: String,
   type: String,
   distanza: Number,
   descrizione: String,
   utenteId: String

});

const luogo = mongoose.model('luogo', luogoSchema); //convert to model named Tea
module.exports = luogo; //export for controller use
