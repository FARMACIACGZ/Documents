const mongoose = require("mongoose"); //import mongoose

// tea schema
const utenteSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    account_type: String
});

const utente = mongoose.model('utente', utenteSchema); //convert to model named Tea
module.exports = utente; //export for controller use