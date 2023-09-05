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
      nome: dbEntry.nome,
      utenteId: dbEntry.utenteId,
      indirizzo: dbEntry.indirizzo,
      type: dbEntry.type,
      descrizione: dbEntry.descrizione,
      distanza: dbEntry.distanza
      };
   });

   res.status(200).json(luogo);
});

router.get('/tipo/:type', async (req, res) => {
   let luogo = await Luogo.find({ type: req.params.type });
   
   if (luogo.length === 0) {
      return res.status(404).json({
         message: 'Luogo not found'
      });
   }
   
   
   
   luogo = luogo.map((dbEntry) =>{
      return{
         self: '/luogo/' + dbEntry.id,
      nome: dbEntry.nome,
      utenteId: dbEntry.utenteId,
      indirizzo: dbEntry.indirizzo,
      type: dbEntry.type,
      descrizione: dbEntry.descrizione,
      distanza: dbEntry.distanza
      }
   });
   res.status(200).json(luogo);

});

router.get('/utente/:idUtente', async (req, res) => {
   let luogo = await Luogo.find({ utenteId: req.params.idUtente });
   
   if (luogo.length == 0) {
      return res.status(404).json({
         message: 'Luogo not found'
      });
   }
   
   
   
   luogo = luogo.map((dbEntry) =>{
      return{
         self: '/luogo/' + dbEntry.id,
      nome: dbEntry.nome,
      utenteId: dbEntry.utenteId,
      indirizzo: dbEntry.indirizzo,
      type: dbEntry.type,
      descrizione: dbEntry.descrizione,
      distanza: dbEntry.distanza
      }
   });
   res.status(200).json(luogo);

});


router.post("", async (req, res) => {
   let luogo = new Luogo ({
      nome: req.body.nome,
      indirizzo: req.body.indirizzo,
      type: req.body.type,
      distanza: req.body.distanza,
      descrizione: req.body.descrizione,
      utenteId: req.body.utenteId,
   });

   luogo = await luogo.save();

   let luogoId = luogo.id;
   let luogoUtenteId = luogo.utenteId;
   console.log("Luogo id:" + luogoId + " Utente id:" + luogoUtenteId);
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