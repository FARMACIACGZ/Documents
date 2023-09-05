function modelloMedico(luogo, utente) {
    li += "<td>" + utente.name + "</td>";
    li += "<td>" + utente.surname + "</td>";
    li += "<td>" + utente.account_type + "</td>";
    li += "<td>" + luogo.nome + "</td>";
    li += "<td>" + luogo.indirizzo + "</td>";
    li += "<td>" + luogo.titolo_di_studio + "</td>";
    li += "<td>" + luogo.descrizione + "</td>";
    li += "<td>" + luogo.numero_di_telefono + "</td>";
    li += "<td>" + luogo.distanza + "</td>";
  
    return li;
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
    if (coockieAccount_type == "Farmacista") {
      mostra("bottoniFarmaci");
    }
    const ul = document.getElementById("farmaco"); // Get the list where we will place our authors
    let pulsante = document.getElementById("pulsanteInsertFarmaco");
  
    const url = "../farmaco";
    let li = "";
    fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        // Here you get the data to modify as you please
        data.forEach((farmaco) => {
          if (coockieAccount_type == "Farmacista") {
            if (luogoId == farmaco.luogoId) {
              li += "<tr>" + modelloFarmaco(farmaco);
  
              li +=
                '<td><button onclick="deleteFarmaco(li)">Elimina Farmaco</button></td>';
            }
          } else if (coockieAccount_type == "Medico") {
            li +=
              '<td><button onclick="prescriviFarmaco(li)">Prescrivi Farmaco</button></td>';
          } else if (coockieAccount_type == "Cliente/Paziente") {
            li += "<tr>" + modelloFarmaco(farmaco);
          } else {
            li += "<tr>" + modelloFarmaco(farmaco);
          }
  
          li += "</tr>";
        });
        ul.innerHTML = li;
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
  }
  
  // function getFarmacoById(id) {
  //     const ul = document.getElementById('idFarmaco'); // Get the list where we will place our authors
  
  //     ul.textContent = '';
  //     const url = id;
  //     let li = '<tr>' + thFarmaco() + '</tr>';
  //     fetch(url)
  //         .then((resp) => resp.json()) // Transform the data into json
  //         .then(function (data) { // Here you get the data to modify as you please
  
  //             li = '<tr>' + modelloFarmaco(data, li) + '</tr>';
  
  //             ul.innerHTML = li;
  
  //         })
  //         .catch(error => console.error(error));// If there is any error you will catch them here
  
  // }
  
  function insertFarmaco(luogoSelf) {
    //get the farmaco name
    var farmacoName = document.getElementById("farmacoName").value;
    var farmacoModalitauso = document.getElementById("farmacoModalitauso").value;
    var farmacoFoglio_illustrativo = document.getElementById(
      "farmacoFoglio_illustrativo"
    ).value;
    var farmacoScadenza = document.getElementById("farmacoScadenza").value;
    var farmacoPrezzo = document.getElementById("farmacoPrezzo").value;
    var farmacoQuantita = document.getElementById("farmacoQuantita").value;
  
    fetch("../farmaco", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: farmacoName,
        modalitauso: farmacoModalitauso,
        foglio_illustrativo: farmacoFoglio_illustrativo,
        scadenza: farmacoScadenza,
        prezzo: farmacoPrezzo,
        quantita: farmacoQuantita,
        luogoId: luogoSelf,
      }),
    })
      .then((resp) => {
        console.log(resp);
        loadFarmaci(luogoSelf);
        return;
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
  }
  
  function deleteFarmaco(self) {
    fetch(self, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((resp) => {
        console.log(resp);
        loadFarmaci(luogoSelf);
        return;
      })
      .catch((error) => console.error(error));
  }
  
  //LUOGHI
  
  function loadMedico() {
    const ul = document.getElementById(chi); // Get the list where we will place our authors
  
    ul.textContent = "";
    const urlLuogo = "../luogo";
    const url = urlLuogo;
  
    let li = "<tr>" + thLuogo() + "</tr>";
    fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        // Here you get the data to modify as you please
  
        // console.log(data);
  
        // Map through the results and for each run the code below
        data.forEach((luogo) => {
          const url2 = ".." + luogo.utenteId;
  
          if (luogo.type == chi) {
            fetch(url2)
              .then((resp) => resp.json()) // Transform the data into json
              .then(function (data) {
                // Here you get the data to modify as you please
                li = "<tr>" + modelloLuogo(luogo, li);
  
                li = modelloUtente(data, li);
                let urlDeleteLuogo = luogo.self;
                if (luogo.type == "Farmacia") {
                  li += `<td><button  onclick="loadFarmaci('${luogo.self}');changeFarmaciaUser('${luogo.utenteId}');mostra('farmacoform')">Vedi Farmaci</button></td>`;
                } else {
                  if (loggedUser.self != undefined) {
                    li += `<td><button  onclick="mostra('nuovaVisita');changeFarmaciaUser('${luogo.self}')">Prenota visita</button></td>`;
                  }
                }
                if ("/utente/" + loggedUser.self == luogo.utenteId) {
                  li += `<td><button  onclick="deleteLuogo('${urlDeleteLuogo}','${luogo.type}')">Delete luogo </button></td>`;
                }
                li += "</tr>";
                ul.innerHTML = li;
              })
              .catch((error) => console.error(error)); // If there is any error you will catch them here
          }
        });
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
  }
  function loadFarmacie() {
    const ul = document.getElementById(chi); // Get the list where we will place our authors
  
    ul.textContent = "";
    const urlLuogo = "../luogo";
    const url = urlLuogo;
  
    let li = "<tr>" + thLuogo() + "</tr>";
    fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        // Here you get the data to modify as you please
  
        // console.log(data);
  
        // Map through the results and for each run the code below
        data.forEach((luogo) => {
          const url2 = ".." + luogo.utenteId;
  
          if (luogo.type == chi) {
            fetch(url2)
              .then((resp) => resp.json()) // Transform the data into json
              .then(function (data) {
                // Here you get the data to modify as you please
                li = "<tr>" + modelloLuogo(luogo, li);
  
                li = modelloUtente(data, li);
                let urlDeleteLuogo = luogo.self;
                if (luogo.type == "Farmacia") {
                  li += `<td><button  onclick="loadFarmaci('${luogo.self}');changeFarmaciaUser('${luogo.utenteId}');mostra('farmacoform')">Vedi Farmaci</button></td>`;
                } else {
                  if (loggedUser.self != undefined) {
                    li += `<td><button  onclick="mostra('nuovaVisita');changeFarmaciaUser('${luogo.self}')">Prenota visita</button></td>`;
                  }
                }
                if ("/utente/" + loggedUser.self == luogo.utenteId) {
                  li += `<td><button  onclick="deleteLuogo('${urlDeleteLuogo}','${luogo.type}')">Delete luogo </button></td>`;
                }
                li += "</tr>";
                ul.innerHTML = li;
              })
              .catch((error) => console.error(error)); // If there is any error you will catch them here
          }
        });
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
  }
  
  //UTENTI
  function thUtente() {
    let li = "<th>Id:</th>";
    li += "<th>Name:</th>";
    li += "<th>Cognome:</th>";
    li += "<th>Data di nascita:</th>";
    li += "<th>Codice fiscale:</th>";
    li += "<th>email:</th>";
    li += "<th>Password:</th>";
    li += "<th>Tipo di account:</th>";
    li += "<th>Titolo di studio:</th>";
    li += "<th>Indirizzo:</th>";
    li += "<th>SPID:</th>";
    return li;
  }
  function modelloUtente(utente, li) {
    li += "<td>" + utente.self + "</td>";
    li += "<td>" + utente.name + "</td>";
    li += "<td>" + utente.surname + "</td>";
    li += "<td>" + utente.year + "</td>";
    li += "<td>" + utente.CF + "</td>";
    li += "<td>" + utente.email + "</td>";
    li += "<td>" + utente.password + "</td>";
    li += "<td>" + utente.account_type + "</td>";
    li += "<td>" + utente.titolo_studio + "</td>";
    li += "<td>" + utente.indirizzo + "</td>";
    li += "<td>" + utente.SPID + "</td>";
  
    return li;
  }
  async function returnUtente(url, li) {
    li = await fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        modelloUtente(data, li);
      });
    return li;
  }
  function getUtentiAccountType(chi) {
    const ul = document.getElementById(chi); // Get the list where we will place our authors
  
    const url = "../utente/";
    let li = "<tr>" + thUtente() + "</tr>";
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        data.forEach((utente) => {
          if (utente.account_type == chi) {
            li = "<tr>" + modelloUtente(utente, li);
            if (loggedUser.self != undefined) {
              li += `<td><button  onclick="loadChat();mostra('chatform')">Chat</button><td>`;
            }
  
            li += "</tr>";
          }
        });
        ul.innerHTML = li;
      })
      .catch((error) => console.error(error)); // If there is any error you will catch them here
  }
  function getUtentiById(id) {
    const ul = document.getElementById("log");
  
    if (id != undefined) {
      ul.textContent = "";
      const url = "../utente/" + id;
      let li = "<tr>" + thUtente() + "</tr>";
      fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
          // Here you get the data to modify as you please
  
          li = "<tr>" + modelloUtente(data, li);
  
          li += `<td><button  onclick="deleteUtente('${data.self}')">Delete utente</button></td>`;
  
          li += "</tr>";
  
          ul.innerHTML = li;
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
    } else {
      ul.textContent = "undefined";
    }
  }
  function loadPazienti() {
    getUtentiAccountType("Utente");
    getUtentiAccountType("Autenticato");
  }
  
  function deleteUtente(self) {
    fetch(self, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((resp) => {
        console.log(resp);
        loadUtenti();
        return;
      })
      .catch((error) => console.error(error));
  }
  