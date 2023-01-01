const express = require('express');
const router = express.Router();
const Utente = require('../models/utente'); // get our mongoose model

function modelloUtente  (utente) {
    let a = {
        self: '/utente/' + utente.id,
        name: utente.name,
        surname: utente.surname,
        year: utente.year,
        CF: utente.CF,
        email: utente.email,
        password: utente.password,
        account_type: utente.account_type,
        titolo_studio: utente.titolo_studio,
        indirizzo: utente.indirizzo,
        SPID: utente.SPID
    };
    return a;
}
function mapModelloUtente(utente, res){
    utente = utente.map((entry) => {
        return {
            self: '/utente/' + entry.id,
            name: entry.name,
            surname: entry.surname,
            year: entry.year,
            CF: entry.CF,
            email: entry.email,
            password: entry.password,
            account_type: entry.account_type,
            titolo_studio: entry.titolo_studio,
            indirizzo: entry.indirizzo,
            SPID: entry.SPID
        }
    });

    res.status(200).json(utente);

}
router.get('/:id', async (req, res) => {
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    let utente = await Utente.findById(req.params.id);
    res.status(200).json(modelloUtente(utente));

});



router.get('', async (req, res) => {
    let utente;

    if (req.query.email)
        // https://mongoosejs.com/docs/api.html#model_Model.find
        utente = await Utente.find({ email: req.query.email }).exec();
    else
        utente = await Utente.find().exec();
    
    mapModelloUtente(utente, res);
    
});
router.post('', async (req, res) => {

    let utente = new Utente({
        name: req.body.name,
        surname: req.body.surname,
        year: req.body.year,
        CF: req.body.CF,
        email: req.body.email,
        password: req.body.password,
        account_type: req.body.account_type,
        titolo_studio: req.body.titolo_studio,
        indirizzo: req.body.indirizzo,
        SPID: req.body.SPID
    });

    if (!utente.email || typeof utente.email != 'string' || !checkIfEmailInString(utente.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }

    utente = await utente.save();

    let utenteId = utente.id;

    /**
     * Link to the newly created resource is returned in the Location header
     * https://www.restapitutorial.com/lessons/httpmethods.html
     */
    res.location("/utente/" + utenteId).status(201).send();
});


// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkIfEmailInString(text) {
    // eslint-disable-next-line
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

router.delete('/:id', async (req, res) => {
    let utente = await Utente.findById(req.params.id).exec();
    if (!utente) {
        res.status(404).send()
        console.log('utente not found')
        return;
    }
    await utente.deleteOne()
    console.log('utente removed')
    res.status(204).send()
});

module.exports = router;
