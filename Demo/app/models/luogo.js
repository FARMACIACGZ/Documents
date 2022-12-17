const mongoose = require("mongoose"); //import mongoose

// tea schema
const luogoSchema = new mongoose.Schema({
    
   indirizzo: String,
   type: String,
   descrizione: String,
   numero_di_telefono: String,    
   utenteId: String,
   distanza: Number

});

const luogo = mongoose.model('luogo', luogoSchema); //convert to model named Tea
module.exports = luogo; //export for controller use
