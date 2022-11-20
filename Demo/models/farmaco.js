const mongoose = require("mongoose"); //import mongoose

// tea schema
const FarmacoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    disponibilita: Boolean,
    scadenza: date,
    uso: [{ text: String}]
});

const Farmaco = mongoose.model('Farmaco', FarmacoSchema); //convert to model named Tea
module.exports = Farmaco; //export for controller use