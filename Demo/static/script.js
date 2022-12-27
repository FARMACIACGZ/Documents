
var loggedUser = {};

function nascondiTuttoTranne(id){
    if(id!='loginform')
    document.getElementById('loginform').style.display = 'none';
    if (id != 'farmacoform')
    document.getElementById('farmacoform').style.display='none';
    if (id != 'utenteform')
    document.getElementById('utenteform').style.display='none';
    if (id != 'luogoform')
    document.getElementById('luogoform').style.display='none';
    if (id != 'farmacieform')
    document.getElementById('farmacieform').style.display = 'none';
    if (id != 'ricettaform')
        document.getElementById('ricetteform').style.display = 'none';
    if (id != 'visitaform')
        document.getElementById('visitaform').style.display = 'none';
    if (id != 'chatform')
        document.getElementById('chatform').style.display = 'none';
    if (id != 'acquistoform')
        document.getElementById('acquistoform').style.display = 'none';
}
nascondiTuttoTranne('a');
function mostra(id) {
    if (document.getElementById(id).style.display == 'block') {
        document.getElementById(id).style.display = 'none';

    }
    else
        document.getElementById(id).style.display = 'block';

    nascondiTuttoTranne(id);

}

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
            loggedUser.account_type = data.account_type;
            document.getElementById("loggedUser").innerHTML = loggedUser.email;
            if(data.success==true){
                getUtentiAccountType(loggedUser.account_type)
                

            }

            return;
        }).catch(error => console.error(error));
};


//UTENTI

function modelloUtente(utente, ul) {
    let a = document.createElement('a');



    let li = document.createElement('li');
    let span = document.createElement('span');
    // span.innerHTML = `<a href="${utente.self}">${utente.name}</a>`;
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
    return ul.textContent;
}



function getUtentiAccountType(chi){
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
                    modelloUtente(utente, ul)
                }
                
            })
        })
        .catch(error => console.error(error));// If there is any error you will catch them here

}


function loadUtenti(){
    getUtentiAccountType('Utente');
    getUtentiAccountType('Autenticato');
    getUtentiAccountType('Medico');
    getUtentiAccountType('Farmacista');
};


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


function deleteFarmaco(self) {

    fetch(self, {
        method: 'DELETE'
        ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    }).then((resp) => {
        console.log(resp);
        loadFarmaci();
        return;
    })
        .catch(error => console.error(error));
}





//FARMACI

function loadFarmaci() {

    const ul = document.getElementById('luogo'); // Get the list where we will place our authors

    ul.textContent = '';

    fetch('../luogo')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            // console.log(data);

            return data.map(function (luogo) { // Map through the results and for each run the code below

                // let luogoId = luogo.self.substring(luogo.self.lastIndexOf('/') + 1);

                let li = document.createElement('li');
                let span = document.createElement('span');
                // span.innerHTML = `<a href="${luogo.self}">${luogo.name}</a>`;
                let a = document.createElement('a');
                a.href = luogo.self
                a.textContent = luogo.name;
                span.innerHTML += `<button type="button" onclick="deleteLuogo('${luogo.self}')">Delete luogo</button>`
                let button = document.createElement('button');


                // Append all our elements
                span.appendChild(a);
                li.appendChild(span);
                ul.appendChild(li);
            })
        })
        .catch(error => console.error(error));// If there is any error you will catch them here

}

function insertLuogo() {
    //get the luogo name
    var luogoName = document.getElementById("luogoName").value;
    var luogoModalitauso = document.getElementById("luogoModalitauso").value;
    var luogoFoglio_illustrativo = document.getElementById("luogoFoglio_illustrativo").value;

    console.log(luogoName);
    console.log(luogoFoglio_illustrativo);
    console.log(luogoModalitauso);
    fetch('../luogo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: luogoName,
            modalitauso: luogoModalitauso,
            foglio_illustrativo: luogoFoglio_illustrativo
        }),
    })
        .then((resp) => {
            console.log(resp);
            loadFarmaci();
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here

};


function deleteLuogo(self) {

    fetch(self, {
        method: 'DELETE'
        ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    }).then((resp) => {
        console.log(resp);
        loadFarmaci();
        return;
    })
        .catch(error => console.error(error));
}



