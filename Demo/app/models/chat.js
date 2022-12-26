const mongoose = require("mongoose"); //import mongoose

// tea schema
const chatSchema = new mongoose.Schema({

    data: Date,
    mittente: String,
    destinatario: String,
    text_message: String



});

const chat = mongoose.model('chat', chatSchema); //convert to model named Tea
module.exports = chat; //export for controller use
