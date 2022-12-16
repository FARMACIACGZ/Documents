const mongoose = require("mongoose"); //import mongoose

// tea schema
const acquistoSchema = new mongoose.Schema({
    
    data: Date,
    utenteId: String,
    farmacia_possiede_farmacoId: String 


});

const acquisto = mongoose.model('acquisto', acquistoSchema); //convert to model named Tea
module.exports = acquisto; //export for controller use
