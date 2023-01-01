const express = require('express');
const router = express.Router();
const Visita = require('../models/visita'); // get our mongoose model
const Utente = require('../models/utente'); // get our mongoose model
const Luogo = require('../models/luogo'); // get our mongoose model



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
            utenteId: '/utente/' + dbEntry.utenteId,
            luogoId: '/luogo/' + dbEntry.luogoId,
            data: dbEntry.data
        };
    });

    res.status(200).json(visita);
});

router.get('/:id', async (req, res) => {
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    let visita = await Visita.findById(req.params.id);
    res.status(200).json({
        self: '/luogo/' + visita.id,
        utenteId: '/utente/' + visita.utenteId,
        luogoId: '/luogo/' + visita.luogoId,
        data: visita.data
    });

});



router.post('', async (req, res) => {
    let utenteUrl = req.body.utenteId;
    let luogoUrl = req.body.luogoId;

    if (!utenteUrl) {
        res.status(400).json({ error: 'Utente not specified' });
        return;
    };

    if (!luogoUrl) {
        res.status(400).json({ error: 'Luogo not specified' });
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

    let luogoId = luogoUrl.substring(luogoUrl.lastIndexOf('/') + 1);
    let luogo = null;
    try {
        luogo = await Luogo.findById(luogoId).exec();
    } catch (error) {
        // CastError: Cast to ObjectId failed for value "11" at path "_id" for model "Luogo"
    }

    if (luogo == null) {
        res.status(400).json({ error: 'Luogo does not exist' });
        return;
    };

    if ((await Visita.find({ luogoId: luogoId }).exec()).lenght > 0) {
        res.status(409).json({ error: 'Luogo already out' });
        return
    }

    let visita = new Visita({
        utenteId: utenteId,
        luogoId: luogoId,
        data: req.body.data
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