const express = require('express');
const router = express.Router();
const Chat = require('../models/chat'); // get our mongoose model
const Utente = require('../models/utente'); // get our mongoose model
const UtenteMedico = require('../models/utente'); // get our mongoose model



/**
 * Resource representation based on the following the pattern: 
 * https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
 */
router.get('', async (req, res) => {
    let chat;

    if (req.query.mittente)
        chat = await Chat.find({
            utenteId: req.query.utenteId
        }).exec();

    else
        chat = await Chat.find({}).exec();

    chat = chat.map((dbEntry) => {
        return {
            self: '/chat/' + dbEntry.id,
            mittente: '/utente/' + dbEntry.mittente,
            destinatario: '/utente/' + dbEntry.destinatario,
            data: dbEntry.data,
            text_message: dbEntry.text_message
        };
    });

    res.status(200).json(chat);
});



router.post('', async (req, res) => {
    let utenteUrl = req.body.utenteId;
    let utenteMedicoUrl = req.body.utenteMedicoId;

    if (!utenteUrl) {
        res.status(400).json({ error: 'Utente not specified' });
        return;
    };

    if (!utenteMedicoUrl) {
        res.status(400).json({ error: 'UtenteMedico not specified' });
        return;
    };

    let utenteId = utenteUrl.substring(utenteUrl.lastIndexOf('/') + 1);
    let utente = null;
    try {
        utente = await Utente.findById(utenteId);
    } catch (error) {
        // This catch CastError when utenteId cannot be casted to mongoose ObjectId
        // CastError: Cast to ObjectId failed for value "11" at path "_id" for model "Utente"
    }

    if (utente == null) {
        res.status(400).json({ error: 'Utente does not exist' });
        return;
    };

    let utenteMedicoId = utenteMedicoUrl.substring(utenteMedicoUrl.lastIndexOf('/') + 1);
    let utenteMedico = null;
    try {
        utenteMedico = await UtenteMedico.findById(utenteMedicoId).exec();
    } catch (error) {
        // CastError: Cast to ObjectId failed for value "11" at path "_id" for model "UtenteMedico"
    }

    if (utenteMedico == null) {
        res.status(400).json({ error: 'UtenteMedico does not exist' });
        return;
    };

    if ((await Chat.find({ utenteMedicoId: utenteMedicoId }).exec()).lenght > 0) {
        res.status(409).json({ error: 'UtenteMedico already out' });
        return
    }

    let chat = new Chat({
        utenteId: utenteId,
        utenteMedicoId: utenteMedicoId,
        data: req.body.data,
        text_message: req.body.text_message
    });

    chat = await chat.save();

    let chatId = chat.id;

    res.location("/chat/" + chatId).status(201).send();
});



router.delete('/:id', async (req, res) => {
    let lending = await Chat.findById(req.params.id).exec();
    if (!lending) {
        res.status(404).send()
        console.log('chat not found')
        return;
    }
    await lending.deleteOne()
    console.log('chat removed')
    res.status(204).send()
});



module.exports = router;