const express = require('express');
const router = express.Router();
const Utente = require('./models/utente'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


// ---------------------------------------------------------
// route to authenticate and get a new token
// --------------------------------------------------------
router.post('', async function (req, res) {


    // find the user
    let user = await Utente.findOne({
        email: req.body.email
    }).exec();

    // user not found
    if (!user) {
        console.log("UTENTE NON TROVATO");
        res.json({ success: false, message: 'Authentication failed. User not found.' });
        return;
    }

    // check if password matches
    if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
    }

    // if user is found and password is right create a token
    var payload = {
        email: user.email,
        id: user._id
        // other data encrypted in the token	
    }
    var options = {
        expiresIn: 86400 // expires in 24 hours
    }
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token,
        email: user.email,
        id: user._id,
        self: user._id,
        account_type: user.account_type
    });

});



module.exports = router;