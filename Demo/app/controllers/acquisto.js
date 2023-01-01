const express = require('express');
const router = express.Router();
const Acquisto = require('../models/acquisto'); // get our mongoose model
const Utente = require('../models/utente'); // get our mongoose model
const Farmaco = require('../models/farmaco'); // get our mongoose model



/**
 * Resource representation based on the following the pattern: 
 * https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
 */
router.get('', async (req, res) => {
    let acquisto;

    if (req.query.utenteId)
        acquisto = await Acquisto.find({
            utenteId: req.query.utenteId
        }).exec();

    else
        acquisto = await Acquisto.find({}).exec();

    acquisto = acquisto.map((dbEntry) => {
        return {
            self: '/acquisto/' + dbEntry.id,
            utenteId: '/utente/' + dbEntry.utenteId,
            farmacoId: '/farmaco/' + dbEntry.farmacoId,
            data: dbEntry.data
           
             
        };
    });

    res.status(200).json(acquisto);
});



router.post('', async (req, res) => {
    let utenteUrl = req.body.utenteId;
    let farmacoUrl = req.body.farmacoId;

    if (!utenteUrl) {
        res.status(400).json({ error: 'Utente not specified' });
        return;
    };

    if (!farmacoUrl) {
        res.status(400).json({ error: 'Farmaco not specified' });
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

    let farmacoId = farmacoUrl.substring(farmacoUrl.lastIndexOf('/') + 1);
    let farmaco = null;
    try {
        farmaco = await Farmaco.findById(farmacoId).exec();
    } catch (error) {
        // CastError: Cast to ObjectId failed for value "11" at path "_id" for model "Farmaco"
    }

    if (farmaco == null) {
        res.status(400).json({ error: 'Farmaco does not exist' });
        return;
    };

    if ((await Acquisto.find({ farmacoId: farmacoId }).exec()).lenght > 0) {
        res.status(409).json({ error: 'Farmaco already out' });
        return
    }

    let acquisto = new Acquisto({
        utenteId: utenteId,
        farmacoId: farmacoId,
        data: req.body.data

    });

    acquisto = await acquisto.save();

    let acquistoId = acquisto.id;

    res.location("/acquisto/" + acquistoId).status(201).send();
});



router.delete('/:id', async (req, res) => {
    let lending = await Acquisto.findById(req.params.id).exec();
    if (!lending) {
        res.status(404).send()
        console.log('acquisto not found')
        return;
    }
    await lending.deleteOne()
    console.log('acquisto removed')
    res.status(204).send()
});



module.exports = router;