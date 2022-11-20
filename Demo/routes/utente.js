const express = require('express'); //import express

// 1.
const router = express.Router();

const utenteController = require('../controllers/utente');


router.post('/utente', utenteController.newUtente);

router.get('/utente', utenteController.getAllUtente );


router.delete('/utente', utenteController.deleteAllUtente );

router.get('/utente/:name', utenteController.getOneUtente );

router.delete('/utente/:name', utenteController.deleteOneUtente );

module.exports = router; // export to use in server.js

