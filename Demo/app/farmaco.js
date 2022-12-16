const express = require('express');
const router = express.Router();
const Farmaco = require('./models/farmaco'); // get our mongoose model



router.get('/:id', async (req, res) => {
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    let farmaco = await Farmaco.findById(req.params.id);
    res.status(200).json({
        self: '/api/v1/farmaco/' + farmaco.id,
        name: farmaco.name,
        modalitauso: farmaco.modalitauso,
        foglio_illustrativo: farmaco.foglio_illustrativo   
    });
});

router.get('', async (req, res) => {
    // https://mongoosejs.com/docs/api.html#model_Model.find
    let farmaco = await Farmaco.find({});
    farmaco = farmaco.map((farmaco) => {
        return {
            self: '/api/v1/farmaco/' + farmaco.id,
            name: farmaco.name,
            modalitauso: farmaco.modalitauso,
            foglio_illustrativo: farmaco.foglio_illustrativo 
        };
    });
    res.status(200).json(farmaco);
});

router.post('', async (req, res) => {

    let farmaco = new Farmaco({
        self: '/api/v1/farmaco/' + req.body.id,
        name: req.body.name,
        modalitauso: req.body.modalitauso,
        foglio_illustrativo: req.body.foglio_illustrativo 
    });

    

    farmaco = await farmaco.save();

    let farmacoId = farmaco.id;

    /**
     * Link to the newly created resource is returned in the Location header
     * https://www.restapitutorial.com/lessons/httpmethods.html
     */
    res.location("/api/v1/farmaco/" + farmacoId).status(201).send();
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
