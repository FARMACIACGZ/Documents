
var loggedUser = {};




function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    fetch('../authentication', {
            method: 'POST'
            ,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        }).then(function (resp) {
        
            return resp.json();

        }) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            loggedUser.token = data.token;
            loggedUser.email = data.email;
            loggedUser.id = data.id;
            loggedUser.self = data.self;
            document.getElementById("loggedUser").innerHTML = loggedUser.email;
            if(data.success==true){
                alert("Accesso eseguito");
                window.location = "http://localhost:8080/api-docs/";
            }
            return;
        }).catch(error => console.error(error));
};




//FARMACI

function loadFarmaci() {

    const ul = document.getElementById('farmaco'); // Get the list where we will place our authors

    ul.textContent = '';

    fetch('../farmaco')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            // console.log(data);

            return data.map(function (farmaco) { // Map through the results and for each run the code below

                // let farmacoId = farmaco.self.substring(farmaco.self.lastIndexOf('/') + 1);

                let li = document.createElement('li');
                let span = document.createElement('span');
                // span.innerHTML = `<a href="${farmaco.self}">${farmaco.name}</a>`;
                let a = document.createElement('a');
                a.href = farmaco.self
                a.textContent = farmaco.name;
                 span.innerHTML += `<button type="button" onclick="deleteFarmaco('${farmaco.self}')">Delete farmaco</button>`
                let button = document.createElement('button');
                

                // Append all our elements
                span.appendChild(a);
                li.appendChild(span);
                ul.appendChild(li);
            })
        })
        .catch(error => console.error(error));// If there is any error you will catch them here

}
loadFarmaci();

function insertFarmaco() {
    //get the farmaco name
    var farmacoName = document.getElementById("farmacoName").value;
    var farmacoModalitauso = document.getElementById("farmacoModalitauso").value;
    var farmacoFoglio_illustrativo = document.getElementById("farmacoFoglio_illustrativo").value;

    console.log(farmacoName);
    console.log(farmacoFoglio_illustrativo);
    console.log(farmacoModalitauso);
    fetch('../farmaco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: farmacoName,
            modalitauso: farmacoModalitauso,
            foglio_illustrativo: farmacoFoglio_illustrativo
        }),
    })
        .then((resp) => {
            console.log(resp);
            loadFarmaci();
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here

};


function deleteFarmaco( self) {
    
    fetch(self, {
        method: 'DELETE'
        ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ }),
    }).then((resp) => {
        console.log(resp);
        loadFarmaci();
        return;
    })
        .catch(error => console.error(error));
}







//UTENTI
function getUtenti(chi){
    const ul = document.getElementById(chi); // Get the list where we will place our authors

    ul.textContent = '';
    const url = '../utente/';

    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            // console.log(data);

            return data.map(function (utente) { // Map through the results and for each run the code below

                // let utenteId = utente.self.substring(utente.self.lastIndexOf('/') + 1);
                if (utente.account_type==chi) {
                    let li = document.createElement('li');
                    let span = document.createElement('span');
                    // span.innerHTML = `<a href="${utente.self}">${utente.name}</a>`;
                    let a = document.createElement('a');
                    a.href = utente.self
                    a.textContent += utente.name + " ";
                    a.textContent += utente.surname + " ";
                    a.textContent += utente.year + " ";
                    a.textContent += utente.CF + " ";
                    a.textContent += utente.email + " ";
                    a.textContent += utente.password + " ";
                    a.textContent += utente.account_type + " ";
                    a.textContent += utente.titolo_studio + " ";
                    a.textContent += utente.indirizzo + " ";
                    a.textContent += utente.SPID + " ";
                    span.innerHTML += `<button type="button" onclick="deleteUtente('${utente.self}')">Delete utente</button>`


                    // Append all our elements
                    span.appendChild(a);
                    li.appendChild(span);
                    ul.appendChild(li);
                }
                
            })
        })
        .catch(error => console.error(error));// If there is any error you will catch them here

}


function loadUtenti(){
    getUtenti('Utente');
    getUtenti('Autenticato');
    getUtenti('Medico');
    getUtenti('Farmacista');
};
loadUtenti();

function insertUtente() {
    //get the utente name
    var utenteName = document.getElementById("utenteName").value;
    var utenteSurname = document.getElementById("utenteSurname").value;
    var utenteYear = document.getElementById("utenteYear").value;
    var utenteCF = document.getElementById("utenteCF").value;
    var utenteEmail = document.getElementById("utenteEmail").value;
    var utentePassword = document.getElementById("utentePassword").value;
    var utenteAccount_type = document.getElementById("utenteAccount_type").value;
    var utenteTitolo_studio = document.getElementById("utenteTitolo_studio").value;
    var utenteIndirizzo = document.getElementById("utenteIndirizzo").value;
    var utenteSpid = document.getElementById("utenteSpid").value;

   
    fetch('../utente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: utenteName,
            surname: utenteSurname,
            year: utenteYear,
            CF: utenteCF,
            email: utenteEmail,
            password: utentePassword,
            account_type: utenteAccount_type,
            titolo_studio: utenteTitolo_studio,
            indirizzo: utenteIndirizzo,
            SPID: utenteSpid
        }),
    })
        .then((resp) => {
            console.log(resp);
            loadUtenti();
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here

};


function deleteUtente(self) {
    
    fetch(self, {
        method: 'DELETE'
        ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    }).then((resp) => {
        console.log(resp);
        loadUtenti();
        return;
    })
        .catch(error => console.error(error));
}