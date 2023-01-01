const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco'); // get our mongoose model
const Luogo = require('../models/luogo'); 


router.get('/:id', async (req, res) => {
    let farmaco = await Farmaco.findById(req.params.id);
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    res.status(200).json({
        self: '/farmaco/' + farmaco.id,
        luogo: '/luogo/' + farmaco.luogoId,
        name: farmaco.name,
        modalitauso: farmaco.modalitauso,
        foglio_illustrativo: farmaco.foglio_illustrativo,
        scadenza: farmaco.scadenza,
        prezzo: farmaco.prezzo,
        quantita: farmaco.quantita, 
    });
});

router.get('', async (req, res) => {
    // https://mongoosejs.com/docs/api.html#model_Model.find
    let farmaco = await Farmaco.find({});
    farmaco = farmaco.map((farmaco) => {
        return {
            self: '/farmaco/' + farmaco.id,
            name: farmaco.name,
            luogoId: '/luogo/'+farmaco.luogoId,
            modalitauso: farmaco.modalitauso,
            foglio_illustrativo: farmaco.foglio_illustrativo ,
            scadenza: farmaco.scadenza,
            prezzo: farmaco.prezzo,
            quantita: farmaco.quantita, 
        };
    });
    res.status(200).json(farmaco);
});

router.post('', async (req, res) => {
   
    let luogoUrl = req.body.luogoId;


    if (!luogoUrl) {
        res.status(400).json({ error: 'Luogo not specified' });
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

    if ((await Farmaco.find({ luogoId: luogoId }).exec()).lenght > 0) {
        res.status(409).json({ error: 'Luogo already out' });
        return
    }
    let farmaco = new Farmaco({
        self: '/farmaco/' + req.body.id,
        name: req.body.name,
        modalitauso: req.body.modalitauso,
        foglio_illustrativo: req.body.foglio_illustrativo,
        luogoId: luogoId,
        scadenza: req.body.scadenza,
        prezzo: req.body.prezzo,
        quantita: req.body.quantita,
    });

    

    farmaco = await farmaco.save();

    let farmacoId = farmaco.id;

    /**
     * Link to the newly created resource is returned in the Location header
     * https://www.restapitutorial.com/lessons/httpmethods.html
     */
    res.location("/farmaco/" + farmacoId).status(201).send();
});





router.delete('/:id', async (req, res) => {
    let farmaco = await Farmaco.findById(req.params.id).exec();
    if (!farmaco) {
        res.status(404).send()
        console.log('farmaco not found')
        return;
    }
    await farmaco.deleteOne()
    console.log('farmaco removed')
    res.status(204).send()
});

module.exports = router;
