const express = require('express');
const router = express.Router();
const Luogo = require('../models/luogo'); // get our mongoose model

const Utente = require('../models/utente'); // get our mongoose model



/**
 * Resource representation based on the following the pattern: 
 * https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
 */
router.get('', async (req, res) => {
   let luogo = await Luogo.find({});

   luogo = luogo.map((dbEntry) => {
      return {
         self: '/luogo/' + dbEntry.id,
         utenteId: '/utente/' + dbEntry.utenteId,
         indirizzo: dbEntry.indirizzo,
         type: dbEntry.type,
         descrizione: dbEntry.descrizione,
         numero_di_telefono: dbEntry.numero_di_telefono,
         distanza: dbEntry.distanza,
      };
   });

   res.status(200).json(luogo);
});

router.get('/:id', async (req, res) => {
   // https://mongoosejs.com/docs/api.html#model_Model.findById
   let luogo = await Luogo.findById(req.params.id);
   res.status(200).json({
      self: '/luogo/' + luogo.id,
      utenteId: '/utente/' + luogo.utenteId,
      indirizzo: luogo.indirizzo,
      type: luogo.type,
      descrizione: luogo.descrizione,
      numero_di_telefono: luogo.numero_di_telefono,
      distanza: luogo.distanza,
   });

});

router.post('', async (req, res) => {
   let utenteUrl = req.body.utenteId;

   if (!utenteUrl) {
      res.status(400).json({ error: 'Utente not specified' });
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
   if ((await Luogo.find({ utenteId: utenteId }).exec()).lenght > 0) {
      res.status(409).json({ error: 'Utente already out' });
      return
   }

   let luogo = new Luogo ({
      
      indirizzo: req.body.indirizzo,
      type: req.body.type,
      descrizione: req.body.descrizione,
      numero_di_telefono: req.body.numero_di_telefono,
      utenteId: utenteId,
      distanza: req.body.distanza
   });

   luogo = await luogo.save();

   let luogoId = luogo.id;

   res.location("/luogo/" + luogoId).status(201).send();
});



router.delete('/:id/?', async (req, res) => {
   let lending = await Luogo.findById(req.params.id).exec();
   if (!lending) {
      res.status(404).send()
      console.log('luogo not found')
      return;
   }
   await lending.deleteOne()
   console.log('luogo removed')
   res.status(204).send()
});



module.exports = router;