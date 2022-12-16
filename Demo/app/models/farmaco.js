const mongoose = require("mongoose"); //import mongoose

// tea schema
const farmacoSchema = new mongoose.Schema({
    
    name: String,
    modalitauso: String, 
    foglio_illustrativo: String    


});

const farmaco = mongoose.model('farmaco', farmacoSchema); //convert to model named Tea
module.exports = farmaco; //export for controller use
