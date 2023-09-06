const jwt = require('jsonwebtoken'); // Utilizzato per creare, firmare e verificare i token JWT

// Middleware per la verifica del token
const tokenChecker = function (req, res, next) {

    // Controlla se il token è presente nell'header, nei parametri dell'URL o nei parametri POST
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Se non è presente alcun token
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Nessun token fornito.'
        });
    }

    // Decodifica il token, verifica il segreto e controlla la scadenza (exp)
    jwt.verify(token, process.env.SUPER_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({
                success: false,
                message: 'Impossibile autenticare il token.'
            });
        } else {
            // Se tutto è corretto, salva le informazioni dell'utente autenticato nella richiesta per l'uso in altre route
            req.loggedUser = decoded;
            next();
        }
    });

};

module.exports = tokenChecker;
