const express = require("express");
const router = express.Router();
const Visita = require("../models/visita"); // get our mongoose model
const Utente = require("../models/utente"); // get our mongoose model
const Luogo = require("../models/luogo"); // get our mongoose model

/**
 * Resource representation based on the following the pattern:
 * https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
 */

router.get("/id/:idMedico", async (req, res) => {
  // https://mongoosejs.com/docs/api.html#model_Model.findById
  let visita = await Visita.find({ medicoId: req.params.idMedico });
  if (visita.length == 0) {
    visita = await Visita.find({ utenteId: req.params.idMedico });
    if (visita.length == 0) {
      return res.status(404).json({
        message: "Visita not found",
      });
    }
  }

  visita = visita.map((dbEntry) => {
    return {
      self: "/visita/" + visita.id,
      utenteId: visita.utenteId,
      medicoId: visita.luogoId,
      data: visita.data,
      descrizione: visita.descrizione
    };
  });
  res.status(200).json(visita);
});

router.post("", async (req, res) => {
  let visita = new Visita({
    utenteId: req.body.utenteId,
    medicoId: req.body.luogoId,
    data: req.body.data,
    descrizione: req.body.descrizione,
  });

  visita = await visita.save();

  let visitaId = visita.id;

  res
    .location("/visita/" + visitaId)
    .status(201)
    .send();
});

router.delete("/:id", async (req, res) => {
  let lending = await Visita.findById(req.params.id).exec();
  if (!lending) {
    res.status(404).send();
    console.log("visita not found");
    return;
  }
  await lending.deleteOne();
  console.log("visita removed");
  res.status(204).send();
});

module.exports = router;
