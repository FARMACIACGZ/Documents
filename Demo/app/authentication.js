const express = require('express');
const router = express.Router();
const Utente = require('./models/utente'); // Importa il modello Mongoose per l'utente
const jwt = require('jsonwebtoken'); // Utilizzato per creare, firmare e verificare i token JWT

// ---------------------------------------------------------
// Percorso per l'autenticazione e l'ottenimento di un nuovo token
// ---------------------------------------------------------
router.post('', async function (req, res) {

    // Trova l'utente nel database
    let user = await Utente.findOne({
        email: req.body.email
    }).exec();

    // Utente non trovato
    if (!user) {
        console.log("UTENTE NON TROVATO");
        res.json({ success: false, message: 'Autenticazione fallita. Utente non trovato.' });
        return;
    }

    // Verifica se la password corrisponde
    if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Autenticazione fallita. Password errata.' });
        return;
    }

    // Se l'utente è stato trovato e la password è corretta, crea un token JWT
    var payload = {
        email: user.email,
        id: user._id
        // Altri dati criptati nel token, se necessario
    }

    var options = {
        expiresIn: 86400 // Scade in 24 ore (valore in secondi)
    }

    // Crea il token JWT utilizzando la chiave segreta SUPER_SECRET da variabile d'ambiente
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    // Invia una risposta con il token e altre informazioni
    res.json({
        success: true,
        message: 'Goditi il tuo token!',
        token: token,
        email: user.email,
        id: user._id,
        self: user._id,
        account_type: user.account_type
    });

});

module.exports = router;
