const express = require('express');
const router = express.Router();
const Visita = require('../models/visita'); // get our mongoose model
const Utente = require('../models/utente'); // get our mongoose model
const UtenteMedico = require('../models/utente'); // get our mongoose model



/**
 * Resource representation based on the following the pattern: 
 * https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
 */
router.get('', async (req, res) => {
    let visita;

    if (req.query.utenteId)
        visita = await Visita.find({
            utenteId: req.query.utenteId
        }).exec();

    else
        visita = await Visita.find({}).exec();

    visita = visita.map((dbEntry) => {
        return {
            self: '/visita/' + dbEntry.id,
            utente: '/utente/' + dbEntry.utenteId,
            utenteMedico: '/utenteMedico/' + dbEntry.utenteMedicoId,
            data: dbEntry.data,
            accettata: dbEntry.accettata
        };
    });

    res.status(200).json(visita);
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

    if ((await Visita.find({ utenteMedicoId: utenteMedicoId }).exec()).lenght > 0) {
        res.status(409).json({ error: 'UtenteMedico already out' });
        return
    }

    let visita = new Visita({
        utenteId: utenteId,
        utenteMedicoId: utenteMedicoId,
        data: req.body.data,
        accettata: req.body.accettata
    });

    visita = await visita.save();

    let visitaId = visita.id;

    res.location("/visita/" + visitaId).status(201).send();
});



router.delete('/:id', async (req, res) => {
    let lending = await Visita.findById(req.params.id).exec();
    if (!lending) {
        res.status(404).send()
        console.log('visita not found')
        return;
    }
    await lending.deleteOne()
    console.log('visita removed')
    res.status(204).send()
});



module.exports = router;