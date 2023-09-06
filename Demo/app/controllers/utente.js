const express = require("express");
const router = express.Router();
const Utente = require("../models/utente"); // Importa il nostro modello mongoose Utente



// Funzione per mappare un array di utenti in un formato specifico e inviarlo come JSON
function mapUtentiModel(utenti, res) {
 
  
  utenti = utenti.map((entry) => {
    return {
      self: "/utente/" + entry.id,
      name: entry.name,
      surname: entry.surname,
      year: entry.year,
      CF: entry.CF,
      email: entry.email,
      password: entry.password,
      account_type: entry.account_type,
      indirizzo: entry.indirizzo,
      SPID: entry.SPID,
      titolo_di_studio: entry.titolo_di_studio,
      biografia: entry.biografia,
    };
  });

  res.status(200).json(utenti);
}

// Recupera un utente per ID
router.get("/:id", async (req, res) => {
  let utente = await Utente.findById(req.params.id);
  mapUtentiModel([utente], res);
  
});

// Recupera utenti per tipo di account
router.get("/type/:tipo", async (req, res) => {
  let utenti = await Utente.find({ account_type: req.params.tipo });
  mapUtentiModel(utenti, res);
});

// Recupera tutti gli utenti o utenti con un'email specifica
router.get("", async (req, res) => {
  let utenti;

  if (req.query.email) {
    utenti = await Utente.find({ email: req.query.email }).exec();
  } else {
    utenti = await Utente.find().exec();
  }

  mapUtentiModel(utenti, res);
});

// Crea un nuovo utente
router.post("", async (req, res) => {
  let utente = new Utente({
    name: req.body.name,
    surname: req.body.surname,
    year: req.body.year,
    CF: req.body.CF,
    email: req.body.email,
    password: req.body.password,
    account_type: req.body.account_type,
    indirizzo: req.body.indirizzo,
    SPID: req.body.SPID,
    titolo_di_studio: req.body.titolo_di_studio,
    biografia: req.body.biografia,
  });

  // Verifica l'validità dell'email
  if (
    !utente.email ||
    typeof utente.email != "string" ||
    !checkIfEmailInString(utente.email)
  ) {
    res
      .status(400)
      .json({
        error: 'The field "email" must be a non-empty string, in email format',
      });
    return;
  }

  utente = await utente.save();

  let utenteId = utente.id;
  console.log("Utente id:" + utenteId);

  // Il link alla risorsa appena creata viene restituito nell'header Location
  res
    .location("/utente/" + utenteId)
    .status(201)
    .send();
});

// Funzione per verificare il formato di un'email
function checkIfEmailInString(text) {
  // eslint-disable-next-line
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
}

// Elimina un utente per ID
router.delete("/:id", async (req, res) => {
  let utente = await Utente.findById(req.params.id).exec();
  if (!utente) {
    res.status(404).send();
    console.log("utente not found");
    return;
  }
  await utente.deleteOne();
  console.log("utente removed");
  res.status(204).send();
});

module.exports = router;
