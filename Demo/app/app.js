const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const cors = require("cors");
const router = express.Router();
require("dotenv").config();

// Importa i controller
const utente = require("./controllers/utente");
const farmaco = require("./controllers/farmaco");
const visita = require("./controllers/visita");
const luogo = require("./controllers/luogo");
const acquisto = require("./controllers/acquisto");
const ricetta = require("./controllers/ricetta");
const chat = require("./controllers/chat");
const tokenChecker = require("./tokenChecker.js");
const authentication = require("./authentication.js");

// Configura l'app Express
app.use(express.static(process.env.FRONTEND || "static"));
app.use(express.static("static")); // Espone anche questa cartella
app.use((req, res, next) => {
  let stringa = req.url;
  let parola = ".html";

  // Esempio di log per richieste contenenti ".html"
  if (stringa.includes(parola)) {
    console.log(stringa);
  }

  if (!req.url.includes(".html") && req.url != "/" &&!req.url.includes("javascript")) {
    console.log(req.method + " " + req.url + " " + req.headers);
    next();
  }
});

// Middleware per l'analisi del corpo delle richieste
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura i percorsi delle API
app.use("/utente", utente);
app.use("/farmaco", farmaco);
app.use("/luogo", luogo);
app.use("/authentication", authentication);

// Middleware per la verifica del token JWT
// app.use("/visita", tokenChecker);
app.use("/acquisto", tokenChecker);

app.use("/ricetta", tokenChecker);

// Configura i controller delle API
app.use("/visita", visita);
app.use("/acquisto", acquisto);
app.use("/ricetta", ricetta);
app.use("/chat", chat);

// Configura la documentazione Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Gestisce le richieste non trovate (404)
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Non trovato" });
});

// Log delle variabili d'ambiente
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);

module.exports = app;
