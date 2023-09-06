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
const coockieAccount_type = getCookie("account_type");
const coockieToken = getCookie("token");
const coockieEmail = getCookie("email");
const coockieUtenteId = getCookie("id");
const coockieSelf = getCookie("self");
const coockieLuogoId = getCookie("luogoId");

function stampaCoockie() {
  alert(coockieLuogoId);
}

function oggi() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, "0");
  var day = String(currentDate.getDate()).padStart(2, "0");
  var hours = String(currentDate.getHours()).padStart(2, "0");
  var minutes = String(currentDate.getMinutes()).padStart(2, "0");
  var seconds = String(currentDate.getSeconds()).padStart(2, "0");

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
      returnLuogo();

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
function modelloMedico(utente) {
  let li = "";
  li += "<td>" + utente.name + "</td>";
  li += "<td>" + utente.surname + "</td>";
  li += "<td>" + utente.type + "</td>";

  li += "<td>" + utente.titolo_di_studio + "</td>";
  li += "<td>" + utente.biografia + "</td>";

  return li;
}

function loadUtente(idUtente, elemento, codiceHtml) {
  alert("entra");

  let url = ".." + idUtente;
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      data.forEach((utente) => {
        var idUtente = "" + utente.self;
        codiceHtml +=
          "<tr>" +
          modelloUtente(utente) +
          "<td><button onclick=\"insertVisita('" +
          idUtente +
          "')\">Nuova visita</button></td><td><button onclick=\"chat('" +
          idUtente +
          "')\">chat</button><td><button onclick=\"prescrizione('" +
          idUtente +
          "')\">Prescrizione</button></td></td></tr>";
      });

      elemento.innerHTML += codiceHtml;
    })
    .catch((error) => console.error(error));
}
function loadUtenti(tipo) {
  var elemento = document.getElementById("listaCompleta");

  var codiceHtml = "";

  let url = "../utente/type/" + tipo;
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      data.forEach((utente) => {
        var idUtente = "" + utente.self;
        codiceHtml +="<tr>" +modelloUtente(utente)
          if(coockieAccount_type=="Medico"){
            codiceHtml+="<td><button onclick=\"aggiungiPaziente('" +idUtente +"')\">Aggiungi paziente</button></td>";
            elemento.innerHTML += codiceHtml;
          }else{
            let url = "../luogo" +utente.self;
  
            fetch(url)
              .then((resp) => resp.json())
              .then(function (data) {
                data.forEach((luogo) => {
                    codiceHtml += modelloLuogo(luogo);
                    
                    codiceHtml += "</tr>";
                  });
      elemento.innerHTML += codiceHtml;
                 
              })
    
      
    }
          
      });
     
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
    .then((resp) => resp.json())
    .then(function (data) {
      if (data.message == "Luogo not found") {
        mostra("tidLuogo");
        nascondi("studio");
      } else {
        data.forEach((luogo) => {
          mostra("studio");
          nascondi("tidLuogo");

          document.cookie = "luogoId=" + luogo.self;

          var elemento = document.getElementById("studio_medico");
          var codiceHtml = modelloLuogo(luogo);
          elemento.innerHTML += codiceHtml;
        });
      }
    })
    .catch((error) => console.error(error));
}

function loadLuogo(tipo) {

  var elemento = document.getElementById("luogo");
  var codiceHtml="";
  let url = "../luogo/tipo/" + tipo;
  

  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      data.forEach((luogo) => {
        
          codiceHtml += "<tr>"+modelloLuogo(luogo)+"</tr>";

        });
        elemento.innerHTML += codiceHtml;
      })
    .catch((error) => console.error(error));
}
function loadMedici(){

}
function modelloFarmaco(farmaco) {
  let li = "";
  li += "<td>" + farmaco.name + "</td>";
  li += "<td>" + farmaco.modalitauso + "</td>";

  li += "<td>" + farmaco.foglio_illustrativo + "</td>";
  li += "<td>" + farmaco.scadenza + "</td>";
  li += "<td>" + farmaco.prezzo + "</td>";
  li += "<td>" + farmaco.quantita + "</td>";

  return li;
}

function loadFarmaci() {
  let url = "../farmaco";
  if (coockieAccount_type == "Farmacista") {
    mostra("bottoniFarmaci");
    url += coockieLuogoId;
  }

  var elemento = document.getElementById("farmaco");
  var codiceHtml = "";
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      data.forEach((farmaco) => {
        // Here you get the data to modify as you please
        codiceHtml += "<tr>" + modelloFarmaco(farmaco);
        if (coockieAccount_type == "Farmacista") {
          let pulsanteFarmaco = "deleteFarmaco('" + farmaco.self + "');";
          codiceHtml +=
            '<td><button onclick="' +
            pulsanteFarmaco +
            '">Elimina farmaco</button></td>';
        }
        if (coockieAccount_type == "ClientePaziente") {
          codiceHtml += "<td><button> Acquista </button></td>";
        }
        if (coockieAccount_type == "Medico") {
          codiceHtml += "<td><button> Prescrivi</button></td>";
        }
        codiceHtml += "</tr>";
      });
      elemento.innerHTML += codiceHtml;
    })

    .catch((error) => console.error(error));
}


function insertFarmaco() {
  var farmacoName = document.getElementById("farmacoName").value;
  var farmacoModalitauso = document.getElementById("farmacoModalitauso").value;
  var farmacoFoglio_illustrativo = document.getElementById(
    "farmacoFoglio_illustrativo"
  ).value;
  var farmacoScadenza = document.getElementById("farmacoScadenza").value;
  var farmacoPrezzo = document.getElementById("farmacoPrezzo").value;
  var farmacoQuantita = document.getElementById("farmacoQuantita").value;

  var luogoId = coockieLuogoId.replace("/luogo/", "");

  fetch("../farmaco", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: farmacoName,
      modalitauso: farmacoModalitauso,
      foglio_illustrativo: farmacoFoglio_illustrativo,
      scadenza: farmacoScadenza,
      prezzo: farmacoPrezzo,
      quantita: farmacoQuantita,
      luogoId: luogoId,
    }),
  })
    .then((resp) => {
      console.log(resp);
      alert("Registrazione farmaco avvenuta con successo!");
      redirectToPage("farmaco.html");
      return;
    })
    .catch((error) => console.error(error));
}
function deleteFarmaco(farmacoId) {
  alert("Entra");
  let url = "../farmaco/" + farmacoId;
  alert(url);
  fetch(url, {
    method: "DELETE",
  })
    .then((resp) => {
      console.log(resp);
      alert("Farmaco eliminato con successo!");
      // Esegui altre operazioni o reindirizza l'utente a una pagina diversa
      redirectToPage("farmaco.html");
      return;
    })
    .catch((error) => console.error(error));
}

//VISITA
function aggiungiPaziente(visitaUtenteId) {
  var visitaData = oggi();

  var visitaMedicoId = coockieSelf;
  var descrizione = "Aggiungi paziente";
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
      redirectToPage("pazienti.html");
    })
    .catch((error) => console.error(error));
}

function loadPazientiInCura() {
  let url = "../visita/" + coockieSelf;
  var elemento = getElementById("visite");
  var codiceHtml = "";

  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      data.forEach((visita) => {
        // Here you get the data to modify as you pleasetent
        alert(visita.utenteId);
        loadUtente(visita.utenteId, elemento, codiceHtml);
      });
      elemento.innerHTML += codiceHtml;
    })

    .catch((error) => console.error(error));
}
function insertVisita(visitaUtenteId) {}

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

function insertChat(idUtente) {
  alert("Entra");
  let url = "../chat" + idUtente;
  alert(url);
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      alert(data.message);

      var chatData = oggi();

      var chatMittente = coockieSelf;
      var chatDestinatario = idUtente;
      var chatText_message = "";

      fetch("../chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mittente: chatMittente,
          destinatario: chatDestinatario,
          data: chatData,
          text_message: chatText_message,
        }),
      })
        .then((resp) => {
          console.log(resp);

          alert("Registrazione avvenuta con successo!");
          redirectToPage("pazienti.html");
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

// function insertVisita() {
//   var visitaData = document.getElementById("visitaData").value;
//   var visitaUtenteId = loggedUser.self;
//   var visitaLuogoId = farmaciaUser;
//   url = '../visita?utenteId=' + loggedUser.self + '&token=' + loggedUser.token;
//   fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//           data: visitaData,
//           utenteId: visitaUtenteId,
//           luogoId: visitaLuogoId
//       }),
//   })
//       .then((resp) => {
//           console.log(resp);

//           loadVisite();
//           mostra('visitaform');
//           return;
//       })
//       .catch(error => console.error(error)); // If there is any error you will catch them here

// };
// function thVisita() {
//  let li;
//   li = '<th>Id:</th>';
//   li += '<th>Data visita</th>';
//   li += '<th> utente:</th>';
//   li += '<th>luogo:</th>';
//   li += thUtente();
//   li+= thLuogo();
//   return li;
// }
// function modelloVisita(visita) {
//   let li;
//   li = '<td>' + visita.self + '</td>';
//   li += '<td>' + visita.data + '</td>';
//   li += '<td>' + visita.utenteId + '</td>';
//   li += '<td>' + visita.luogoId + '</td>';

//   return li;
// }
// function loadVisite(){

//       const ul = document.getElementById('visita'); // Get the list where we will place our authors

//        url = '../visita?utenteId=' + loggedUser.self + '&token=' + loggedUser.token;

//       let li = '<tr>' + thVisita() + '</tr>';
//       fetch(url)
//           .then((resp) => resp.json()) // Transform the data into json
//           .then(function (data) { // Here you get the data to modify as you please

//               // console.log(data);

//               // Map through the results and for each run the code below

//               data.forEach((visita)=>{

//                   if(visita.utenteId == '/utente/'+loggedUser.self){

//                       const urlLuogo = '..'+visita.luogoId;

//                       fetch(urlLuogo)
//                           .then((resp) => resp.json()) // Transform the data into json
//                           .then(function (luogo) {

//                                   const url2 = '..' + visita.utenteId;

//                                   if (luogo.type == 'Studio') {
//                                   fetch(url2)
//                                       .then((resp) => resp.json()) // Transform the data into json
//                                       .then(function (data) { // Here you get the data to modify as you please

//                                           li += '<tr>' + modelloVisita(visita);

//                                           li = modelloUtente(data, li);
//                                           li = modelloLuogo(luogo, li);

//                                           li += '</tr>';
//                                           ul.innerHTML = li;

//                                       })
//                                   .catch(error => console.error(error));// If there is any error you will catch them here
//                                   }

//                           })
//                   }

//               })

//           })
//           .catch(error => console.error(error));// If there is any error you will catch them here

// }

//ACQUISTO

function insertAcquisto(farmacoId) {
  var acquistoData = Date.now();
  var acquistoUtenteId = loggedUser.self;

  var acquistoFarmacoId = farmacoId;
  url =
    "../acquisto?utenteId=" + loggedUser.self + "&token=" + loggedUser.token;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: acquistoData,
      utenteId: acquistoUtenteId,
      farmacoId: acquistoFarmacoId,
    }),
  })
    .then((resp) => {
      console.log(resp);

      loadAcquisti();
      mostra("acquistoform");
      return;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

function modelloAcquisto(acquisto) {
  let li = "";

  li += "<td>" + acquisto.data + "</td>";


  return li;
}
function modelloFarmacoAcquistato(farmaco) {
  let li = "";
  li += "<td>" + farmaco.name + "</td>";
 
  li += "<td>" + farmaco.prezzo + "</td>";
  li += "<td>" + farmaco.quantita + "</td>";

  return li;
}
function loadFarmaco(idFarmaco) {
  var elemento = document.getElementById("acquisti"); // Get the list where we will place our authors 
  var codiceHtml = "";
  let url = ".." + idFarmaco;  
  fetch(url) 
  .then((resp) => resp.json()) // Transform the data into json 
  .then(function (data) { data.forEach((farmaco) => { // Here you get the data to modify as you please 
   
    codiceHtml += modelloFarmacoAcquistato(farmaco); 
  }); 
  elemento.innerHTML += codiceHtml;
})
  
  .catch((error) => console.error(error));
  } 
  
function loadAcquisti() { 
  
  var elemento = document.getElementById("acquisti"); // Get the list where we will place our authors 
  var codiceHtml = "";
  
  url = "../acquisto?token="+coockieToken;
  
  fetch(url) .then((resp) => resp.json()) // Transform the data into json 
  .then(function (data) { data.forEach((acquisto) => { 
    codiceHtml += "<tr>" + modelloAcquisto(acquisto); 
 
   loadFarmaco(acquisto.farmacoId);
  
      
    });
    codiceHtml += "</tr>";
    elemento.innerHTML = codiceHtml;
  })
  .catch((error) => console.error(error)); // If there is any error you will catch them here
  }

