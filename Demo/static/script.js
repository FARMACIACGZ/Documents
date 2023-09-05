function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}
function oggi() {
  var currentDate = new Date();
var year = currentDate.getFullYear();
var month = String(currentDate.getMonth() + 1).padStart(2, '0');
var day = String(currentDate.getDate()).padStart(2, '0');
var hours = String(currentDate.getHours()).padStart(2, '0');
var minutes = String(currentDate.getMinutes()).padStart(2, '0');
var seconds = String(currentDate.getSeconds()).padStart(2, '0');

var formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;
console.log(formattedDateTime);
 return formattedDateTime;
}

function redirectToPage(paginaHtml) {
  window.location.href = paginaHtml;
}

function mostra(id) {
  document.getElementById(id).style.display = "block";
}

function nascondi(id) {
  document.getElementById(id).style.display = "none";
}

const coockieAccount_type = getCookie("account_type");
const coockieToken = getCookie("token");
const coockieEmail = getCookie("email");
const coockieUtenteId = getCookie("id");
const coockieSelf = getCookie("self");
const coockieLuogoId = getCookie("luogoId");
function intestazione() {
  // Seleziona l'elemento HTML in cui desideri inserire il nuovo codice
  var elemento = document.getElementById("intestazione");
  var codiceHtml = "<h1>FarmaciaCGZ</h1>";

  // Crea il codice HTML che desideri aggiungere
  if (coockieAccount_type == "Farmacista") {
    codiceHtml += intestazioneFarmacista();
  } else if (coockieAccount_type == "Medico") {
    codiceHtml += intestazioneMedico();
  } else if (coockieAccount_type == "ClientePaziente") {
    codiceHtml += intestazioneUtenteAutenticato();
  } else {
    codiceHtml += intestazioneAnonimo();
  }

  // Aggiungi il codice HTML all'elemento selezionato utilizzando innerHTML
  elemento.innerHTML += codiceHtml;
}

function log() {
  // Seleziona l'elemento HTML in cui desideri inserire il nuovo codice
  var elemento = document.getElementById("log");
  var codiceHtml = coockieEmail + "<br> " + coockieAccount_type;

  // Crea il codice HTML che desideri aggiungere

  // Aggiungi il codice HTML all'elemento selezionato utilizzando innerHTML
  elemento.innerHTML += codiceHtml;
}

function intestazioneUtenteAutenticato() {
  return '<a href="farmaco.html"><button  >Lista farmaci acquistabili</button></a>\
\n<a href="acquisto.html"><button  >Lista farmaci acquistati</button></a>\
\n<a href="farmacie.html"><button  >Farmacie</button></a>\
\n<a href="medici.html"><button  >Medici</button></a>\
\n<a href="visite.html"><button  >Lista visite</button></a>\
\n<a href="ricetta.html"><button  >Scheda assunzione farmaci</button></a>\
\n<a href="index_accesso.html"> <button >Account</button></a>';
}

function intestazioneFarmacista() {
  return '<a href="farmaco.html"><button  >Prodotti in vendita</button></a>\
  \n<a href="acquisto.html"><button  >Prodotti venduti</button></a>\
  \n<a href="luogo.html"><button >Informazioni farmacia</button></a>\
 \n<a href="index_accesso.html"> <button >Account</button></a>';
}

function intestazioneMedico() {
  return '<a href="visite.html"><button  >Lista Visite</button></a>\
  \n<a href="luogo.html"><button >Informazioni studio medico</button></a>\
\n<a href="pazienti.html"><button  >Lista pazienti</button></a>\
\n<a href="index_accesso.html"> <button >Account</button></a>';
}

function intestazioneAnonimo() {
  return `
        <a href="farmaco.html"><button >Farmaci</button></a>
        <a href="farmacie.html"><button >Farmacie</button></a>
        <a href="medici.html"><button >Medici</button></a>
        <a href="index.html">

        <button>Log in</button></a>
        `;
}

function opzioneSelezionata() {
  var clienteRadio = document.getElementById("clientePaziente");

  if (!clienteRadio.checked) {
    mostra("tidApp");
    mostra("inserisciUtenteApp");
    nascondi("inserisciUtente");
  } else {
    nascondi("tidApp");
    nascondi("inserisciUtenteApp");
    mostra("inserisciUtente");
  }
}

// Aggiungi un unico ascoltatore di eventi "change" alla form
document.querySelector("form").addEventListener("change", opzioneSelezionata);

function login(email, password) {
  if (email == "vuota") {
    email = document.getElementById("loginEmail").value;
    password = document.getElementById("loginPassword").value;
  }
  fetch("../authentication", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(function (resp) {
      return resp.json();
    }) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      var token = data.token;
      var email = data.email;
      var id = data.id;
      var self = data.self;
      var account_type = data.account_type;

      document.cookie = "token=" + token;
      document.cookie = "email=" + email;
      document.cookie = "id=" + id;
      document.cookie = "self=" + self;
      document.cookie = "account_type=" + account_type;

      if (data.success == true) {
        redirectToPage("index_accesso.html");
      } else {
        alert("Credenziali sbagliate");
      }

      return;
    })
    .catch((error) => console.error(error));
}

function logOut() {
  document.cookie = "token= 'null'";
  document.cookie = "email= 'null'";
  document.cookie = "id=  'null'";
  document.cookie = "self= 'null'";
  document.cookie = "account_type= 'null'";
  redirectToPage("index.html");
}

function insertUtente() {
  //get the utente name
  var utenteName = document.getElementById("utenteName").value;
  var utenteSurname = document.getElementById("utenteSurname").value;
  var utenteEmail = document.getElementById("utenteEmail").value;
  var utentePassword = document.getElementById("utentePassword").value;
  var utenteCF = document.getElementById("utenteCF").value;
  var utenteIndirizzo = document.getElementById("utenteIndirizzo").value;
  var utenteNumero_di_telefono =
    document.getElementById("numero_di_telefono").value;
  var selectedOption = null;
  var radioButtons = document.getElementsByName("utenteTipoUtente");
  var data_di_nascita = document.getElementById("data_di_nascita").value;
  for (var radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedOption = radioButton.value;
      break;
    }
  }

  if (selectedOption === null) {
    alert("Seleziona un'opzione");
    redirectToPage("index.html");
  } else {
    utenteAccount_type = selectedOption;
  }

  var utenteTitoloDiStudio;
  var utenteBio;

  if (utenteAccount_type == "Cliente/Paziente") {
    utenteTitoloDiStudio = null;
    utenteBio = null;
  } else {
    var utenteTitoloDiStudio = document.getElementById(
      "utenteTitoloDiStudio"
    ).value;
    var utenteBio = document.getElementById("utenteBio").value;
  }

  var vero = document.getElementById("vero").checked;
  var falso = document.getElementById("falso").checked;

  if (vero) {
    utenteSpid = true;
  } else if (falso) {
    utenteSpid = false;
  } else {
    // nessuna opzione selezionata
    alert("Inserisci spid");
  }
  var utenteLuogo = null;

  fetch("../utente", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: utenteName,
      surname: utenteSurname,
      email: utenteEmail,
      password: utentePassword,
      CF: utenteCF,
      indirizzo: utenteIndirizzo,
      account_type: utenteAccount_type,
      numero_di_telefono: utenteNumero_di_telefono,
      SPID: utenteSpid,
      year: data_di_nascita,
      titolo_di_studio: utenteTitoloDiStudio,
      biografia: utenteBio,
    }),
  })
    .then((resp) => {
      console.log(resp);

      alert("Registrazione avvenuta con successo!");
      login(utenteEmail, utentePassword);
      return;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

function modelloUtente(utente) {
  let li = "";
  li += "<td>" + utente.name + "</td>";
  li += "<td>" + utente.surname + "</td>";
  li += "<td>" + utente.year + "</td>";
  li += "<td>" + utente.CF + "</td>";
  li += "<td>" + utente.email + "</td>";

  li += "<td>" + utente.indirizzo + "</td>";
  li += "<td>" + utente.SPID + "</td>";

  return li;
}
function loadUtenti(tipo) {
  var elemento = document.getElementById("listaCompleta");
  var codiceHtml = "";
  let url = "../utente/type/" + tipo ;
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      data.forEach((utente) => {
        var idUtente = ''+utente.self;
        codiceHtml += "<tr>" + modelloUtente(utente);
        codiceHtml += '<td><button onclick="insertChat(\'' + idUtente + '\')">Aggiungi paziente</button></td></tr>';

      });
      elemento.innerHTML += codiceHtml;
    })
    .catch((error) => console.error(error));
}
function loadClientiPazienti() {
  loadUtenti("ClientePaziente");
}
function insertLuogo() {
  var luogoNome = document.getElementById("luogoNome").value;

  var luogoIndirizzo = document.getElementById("luogoIndirizzo").value;
  var luogoTipo =
    coockieAccount_type == "Medico" ? "Studio medico" : "Farmacia";
  alert("Entra");

  var luogoDescrizione = document.getElementById("luogoDescrizione").value;

  var luogoDistanza = document.getElementById("luogoDistanza").value;
  var luogoUtenteId = coockieSelf;

  fetch("../luogo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      utenteId: luogoUtenteId,
      nome: luogoNome,
      indirizzo: luogoIndirizzo,
      type: luogoTipo,
      distanza: luogoDistanza,
      descrizione: luogoDescrizione,
    }),
  })
    .then((resp) => {
      console.log(resp);

      alert("Registrazione avvenuta con successo!");
      redirectToPage("luogo.html");
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

function modelloLuogo(luogo) {
  let li;
  li = "<td>" + luogo.nome + "</td>";
  li += "<td>" + luogo.indirizzo + "</td>";
  li += "<td>" + luogo.distanza + "</td>";
  li += "<td>" + luogo.descrizione + "</td>";

  return li;
}

function returnLuogo() {
  let url = "../luogo/utente/" + coockieSelf;
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      if (data.message == "Luogo not found") {
        mostra("tidLuogo");
        nascondi("studio");
      } else {
        data.forEach((luogo) => {
          mostra("studio");
          nascondi("tidLuogo");

          var elemento = document.getElementById("studio_medico");
          var codiceHtml = modelloLuogo(luogo);
          elemento.innerHTML += codiceHtml;
        });
      }
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

function insertVisita() {
  var visitaData = document.getElementById("visitaData").value;

  var visitaUtenteId = document.getElementById("visitaUtenteId").value;
  var visitaMedicoId = document.getElementById("visitaMedicoId").value;

  fetch("../visita", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      utenteId: visitaUtenteId,
      medicoId: visitaMedicoId,
      data: visitaData,
    }),
  })
    .then((resp) => {
      console.log(resp);

      alert("Registrazione avvenuta con successo!");
      redirectToPage("luogo.html");
    })
    .catch((error) => console.error(error));
}

function loadVisite() {
  let url = "../visita/id/" + coockieSelf;
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Here you get the data to modify as you please

      if (data.message == "Luogo not found") {
        mostra("tidLuogo");
        nascondi("studio");
      } else {
        data.forEach((luogo) => {
          mostra("studio");
          nascondi("tidLuogo");

          var elemento = document.getElementById("visite");
          var codiceHtml = modelloLuogo(luogo);
          elemento.innerHTML += codiceHtml;
        });
      }
    })
    .catch((error) => console.error(error));
}

function modelloVisita(visita) {
  let li;
  li = "<td>";
  return li;
}

function insertChat(){
  alert('entra');
}

function insertChat(idUtente) {

  let url = "../chat" + idUtente;
  alert(url);
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      
      alert(data.message);
      if (data.message == "Chat not found") {
        var chatData = oggi();

        var chatMittente = coockieSelf;
        var chatDestinatario = idUtente;
        var chatText_message = 'Paziente aggiunto';

        fetch("../chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mittente: chatMittente,
            destinatario: chatDestinatario,
            data: chatData,
            text_message: chatText_message
          }),
        })
          .then((resp) => {
            console.log(resp);

            alert("Registrazione avvenuta con successo!");
            redirectToPage("chat.html");
          })
          .catch((error) => console.error(error));
      } else {
        
          alert('Paziente gia\' aggiunto');
        
      }
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
