const express = require('express');
const router = express.Router();
const Farmacia = require('../models/farmacia'); // get our mongoose model
const Farmaco = require('../models/farmaco'); // get our mongoose model
const Luogo = require('../models/luogo'); // get our mongoose model



/**
 * Resource representation based on the following the pattern: 
 * https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
 */
router.get('', async (req, res) => {
    let farmacia;

    if (req.query.farmacoId)
        farmacia = await Farmacia.find({
            farmacoId: req.query.farmacoId
        }).exec();

    else
        farmacia = await Farmacia.find({}).exec();

    farmacia = farmacia.map((dbEntry) => {
        return {
            self: '/farmacia/' + dbEntry.id,
            farmaco: '/farmaco/' + dbEntry.farmacoId,
            luogo: '/luogo/' + dbEntry.luogoId,
            scadenza: dbEntry.scadenza,
            prezzo: dbEntry.prezzo,
            quantita: dbEntry.quantita,
        };
    });

    res.status(200).json(farmacia);
});



router.post('', async (req, res) => {
    let farmacoUrl = req.body.farmacoId;
    let luogoUrl = req.body.luogoId;

    if (!farmacoUrl) {
        res.status(400).json({ error: 'Farmaco not specified' });
        return;
    };

    if (!luogoUrl) {
        res.status(400).json({ error: 'Luogo not specified' });
        return;
    };

    let farmacoId = farmacoUrl.substring(farmacoUrl.lastIndexOf('/') + 1);
    let farmaco = null;
    try {
        farmaco = await Farmaco.findById(farmacoId);
    } catch (error) {
        // This catch CastError when farmacoId cannot be casted to mongoose ObjectId
        // CastError: Cast to ObjectId failed for value "11" at path "_id" for model "Farmaco"
    }

    if (farmaco == null) {
        res.status(400).json({ error: 'Farmaco does not exist' });
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

    if ((await Farmacia.find({ luogoId: luogoId }).exec()).lenght > 0) {
        res.status(409).json({ error: 'Luogo already out' });
        return
    }

    let farmacia = new Farmacia({
        farmacoId: farmacoId,
        luogoId: luogoId,
        scadenza: req.body.scadenza,
        prezzo: req.body.prezzo,
        quantita: req.body.quantita,
    });

    farmacia = await farmacia.save();

    let farmaciaId = farmacia.id;

    res.location("/farmacia/" + farmaciaId).status(201).send();
});



router.delete('/:id', async (req, res) => {
    let lending = await Farmacia.findById(req.params.id).exec();
    if (!lending) {
        res.status(404).send()
        console.log('farmacia not found')
        return;
    }
    await lending.deleteOne()
    console.log('farmacia removed')
    res.status(204).send()
});



module.exports = router;