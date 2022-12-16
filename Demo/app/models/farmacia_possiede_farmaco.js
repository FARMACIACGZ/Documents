const mongoose = require("mongoose"); //import mongoose

// tea schema
const possiedeSchema = new mongoose.Schema({
    
    
    scadenza: Date,
    prezzo: double, 
    quantita : int ,
    farmacoID: String


});

const possiede = mongoose.model('possiede', possiedeSchema); //convert to model named Tea
module.exports = possiede; //export for controller use
