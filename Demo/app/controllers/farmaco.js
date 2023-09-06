const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco'); // get our mongoose model
const Luogo = require('../models/luogo'); 


function mapFarmaciModel(farmaco, res) {
    farmaco = farmaco.map((entry) => {
      return {
        self: entry.id,
        luogoId:  entry.luogoId,
        name: entry.name,
        modalitauso: entry.modalitauso,
        foglio_illustrativo: entry.foglio_illustrativo,
        scadenza: entry.scadenza,
        prezzo: entry.prezzo,
        quantita: entry.quantita,
      };
    
    });

    res.status(200).json(farmaco);
}

router.get('/:id', async (req, res) => {
    let farmaco = await Farmaco.findById(req.params.id);
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    mapFarmaciModel([farmaco], res);
});


router.get("/luogo/:luogoId", async (req, res) => {
    let farmaco = await Farmaco.find({ luogoId: req.params.luogoId });
    mapFarmaciModel(farmaco, res);
  });
router.get('', async (req, res) => {
    // https://mongoosejs.com/docs/api.html#model_Model.find
    let farmaco = await Farmaco.find({});
    mapFarmaciModel(farmaco, res);
});

router.post('', async (req, res) => {
    
    let luogoId = req.body.luogoId;
   
  
    if (luogoId) {
     
    
  
    let luogo = null;
    try {
      luogo = await Luogo.findById(luogoId).exec();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  
    if (luogo == null) {
      res.status(400).json({ error: 'Luogo does not exist' });
      return;
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
  
    try {
      farmaco = await farmaco.save();
      let farmacoId = farmaco.id;
      res.location("/farmaco/" + farmacoId).status(201).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
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
