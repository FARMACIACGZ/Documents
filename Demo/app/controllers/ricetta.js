const express = require('express');
const router = express.Router();
const Ricetta = require('../models/ricetta'); // get our mongoose model
const Visita = require('../models/visita'); // get our mongoose model
const Farmaco = require('../models/farmaco'); // get our mongoose model



/**
 * Resource representation based on the following the pattern: 
 * https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
 */
router.get('', async (req, res) => {
    let ricetta;

    if (req.query.visitaId)
        ricetta = await Ricetta.find({
            visitaId: req.query.visitaId
        }).exec();

    else
        ricetta = await Ricetta.find({}).exec();

    ricetta = ricetta.map((dbEntry) => {
        return {
            self: '/ricetta/' + dbEntry.id,
            visita: '/visita/' + dbEntry.visitaId,
            farmacoId: '/farmaco/' + dbEntry.farmacoId,
            data_ricetta: dbEntry.data_ricetta,
            quantita: dbEntry.quantita,
            dose:dbEntry.dose,
            periodo_inizio: dbEntry.periodo_inizio,
            periodo_fine: dbEntry.periodo_fine,
            
        };
    });

    res.status(200).json(ricetta);
});



router.post('', async (req, res) => {
    let visitaUrl = req.body.visitaId;
    let farmacoUrl = req.body.farmacoId;

    if (!visitaUrl) {
        res.status(400).json({ error: 'Visita not specified' });
        return;
    };

    if (!farmacoUrl) {
        res.status(400).json({ error: 'Farmaco not specified' });
        return;
    };

    let visitaId = visitaUrl.substring(visitaUrl.lastIndexOf('/') + 1);
    let visita = null;
    try {
        visita = await Visita.findById(visitaId);
    } catch (error) {
        // This catch CastError when visitaId cannot be casted to mongoose ObjectId
        // CastError: Cast to ObjectId failed for value "11" at path "_id" for model "Visita"
    }

    if (visita == null) {
        res.status(400).json({ error: 'Visita does not exist' });
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

    if ((await Ricetta.find({ farmacoId: farmacoId }).exec()).lenght > 0) {
        res.status(409).json({ error: 'Farmaco already out' });
        return
    }

    let ricetta = new Ricetta({
        visitaId: visitaId,
        farmacoId: farmacoId,
        data_ricetta: req.body.data_ricetta,
        quantita: req.body.quantita,
        dose: req.body.dose,
        periodo_inizio: req.body.periodo_inizio,
        periodo_fine: req.body.periodo_fine,

    });

    ricetta = await ricetta.save();

    let ricettaId = ricetta.id;

    res.location("/ricetta/" + ricettaId).status(201).send();
});



router.delete('/:id', async (req, res) => {
    let lending = await Ricetta.findById(req.params.id).exec();
    if (!lending) {
        res.status(404).send()
        console.log('ricetta not found')
        return;
    }
    await lending.deleteOne()
    console.log('ricetta removed')
    res.status(204).send()
});



module.exports = router;