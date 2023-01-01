
var loggedUser = {
    
};
var coseUtili = {
    
}

let farmaciaDefault = '/luogo/63b040dde4223f7ddd02dee0';
let farmaciaUser='';
function pulsantiFissi(){
    let li = document.getElementById('fisso');
    li.innerHTML = `<button type="button" onclick="loadFarmaci('tutto');changeFarmaciaUser('');mostra('farmacoform')">Farmaci</button>`;
    li.innerHTML += `<button type="button" onclick="mostra('luogoform')">Luoghi disponibili</button>`;
    li.innerHTML += `<button type="button" onclick="loadMedici();mostra('medicoform')">Medici</button>`;
    li.innerHTML += `<button type="button" onclick="loadFarmacisti();mostra('farmacistaform')">Farmacisti</button>`;
    
    if(loggedUser.account_type!=undefined){

        li.innerHTML += `<button type="button" onclick="loadAcquisto();mostra('acquistoform')">Acquisto</button>`;
        li.innerHTML += `<button type="button" onclick="loadVisite();mostra('visitaform')">Visita</button>`;
        li.innerHTML += `<button type="button" onclick="loadChat();mostra('chatform')">Chat</button>`;

        if (loggedUser.account_type == "Autenticato" || loggedUser.account_type == "Medico" || loggedUser.account_type == "Farmacista") {

            li.innerHTML += `<button type="button" onclick="loadRicette();mostra('ricettaform')">Ricetta</button>`;

           
        } 
        
        
    }
    li.innerHTML += `<button type="button" onclick="getUtentiById(loggedUser.self);mostra('loginform')">Account</button>`;


}
pulsantiFissi();
function nascondiTuttoTranne(id){

    if (id != 'registraUtente' && id != 'loginform' && id != 'mostraLogin')
        document.getElementById('loginform').style.display = 'none';

  
    if (id != 'registraUtente')
        document.getElementById('registraUtente').style.display = 'none';
    if (id != 'mostraLogin')
        document.getElementById('mostraLogin').style.display = 'none';


    if (id != 'farmacoform' && id != 'inserisciFarmaci'){
        document.getElementById('farmacoform').style.display = 'none';

    }
    if (id != 'inserisciFarmaci')
        document.getElementById('inserisciFarmaci').style.display = 'none';


    if (id != 'luogoform' && id != 'inserisciLuogo' && id != 'mostraStudio' && id != 'mostraFarmacia') {
        document.getElementById('luogoform').style.display = 'none';
    }
    if (id != 'inserisciLuogo')
        document.getElementById('inserisciLuogo').style.display = 'none';

    if (id != 'mostraStudio') {
        document.getElementById('mostraStudio').style.display = 'none';

    }
    if (id != 'mostraFarmacia') {
        document.getElementById('mostraFarmacia').style.display = 'none';

    }
    if (id != 'medicoform') {
        document.getElementById('medicoform').style.display = 'none';
    }

    if (id != 'farmacistaform') {
        document.getElementById('farmacistaform').style.display = 'none';

    }
    alert('Prima');
    if (id != 'visitaform')
        document.getElementById('visitaform').style.display = 'none';
    alert('DOpo');
    if (id != 'nuovaVisita')
        document.getElementById('nuovaVisita').style.display = 'none';

    


    



    

    // if (id != 'inserisciFarmacia')
    //     document.getElementById('inserisciFarmacia').style.display = 'none';
    // if (id != 'mostraFarmacia')
    //     document.getElementById('mostraFarmacia').style.display = 'none';
    // if (id != 'farmaciaform' && id != 'mostraFarmacia' && id != 'inserisciFarmacia')
    //     document.getElementById('farmaciaform').style.display = 'none';



    // if (id != 'farmacieform')
    //     document.getElementById('farmacieform').style.display = 'none';
    // if (id != 'ricettaform')
    //     document.getElementById('ricetteform').style.display = 'none';
    
    // if (id != 'chatform')
    //     document.getElementById('chatform').style.display = 'none';
    // if (id != 'acquistoform')
    //     document.getElementById('acquistoform').style.display = 'none';
}
nascondiTuttoTranne('a');

function mostra(id) {
    
    if (document.getElementById(id).style.display == 'block') {
        document.getElementById(id).style.display = 'none';
    }
    else{
        document.getElementById(id).style.display = 'block';
        if (loggedUser.account_type == "Medico" || loggedUser.account_type == "Farmacista") {
           
                try {
                    if ((id + 'pulsante') != 'farmacoformpulsante') {
                        document.getElementById('farmacoformpulsante').style.display = 'none';

                        document.getElementById(id + 'pulsante').style.display = 'block';
                    }
                    else if (farmaciaUser==('/utente/'+loggedUser.self)) {
                        
                        document.getElementById('farmacoformpulsante').style.display = 'block';
                    }
                } catch (error) {

                }
            
           
            
        }

    }
   
    
    nascondiTuttoTranne(id);

}
function changeFarmaciaUser(utenteId) {
    
    farmaciaUser=utenteId;
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
                getUtentiById(loggedUser.self);

                pulsantiFissi();
            }

            return;
        }).catch(error => console.error(error));
};


//FARMACI
function thFarmaco() {
    return '<th>ID: </th><th>Name:</th><th>Modalità uso:</th><th>Foglio illustrativo:</th><th>Scadenza</th><th>Prezzo</th><th>Quantita</th>';
    
}
function modelloFarmaco(farmaco, li) {
    li += '<td>' + farmaco.self + '</td>';
    li += '<td>' + farmaco.name + '</td>';
    li += '<td>' + farmaco.modalitauso + '</td>';
    li += '<td>' + farmaco.foglio_illustrativo + '</td>';
    li += '<td>' + farmaco.scadenza + '</td>';
    li += '<td>' + farmaco.prezzo + '</td>';
    li += '<td>' + farmaco.quantita + '</td>';
    return li;
}

function loadFarmaci(luogoSelf) {
    
    
    const ul = document.getElementById('farmaco'); // Get the list where we will place our authors
    let pulsante = document.getElementById('pulsanteInsertFarmaco');
    pulsante.innerHTML = `<td><button type="button" onclick="insertFarmaco('${luogoSelf}');mostra('farmacoform');">Inserisci farmaco</button></td>`;

    ul.textContent = '';
    const url = '../farmaco';
    let li = '<tr>'+thFarmaco()+'</tr>';
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            data.forEach((farmaco) => {
                
                if(luogoSelf==farmaco.luogoId || luogoSelf == 'tutto'){
                    li = '<tr>' + modelloFarmaco(farmaco, li);
                    if (('/utente/' + loggedUser.self) == farmaciaUser) {
                        li += `<td><button type="button" onclick="deleteFarmaco('${farmaco.self}','${luogoSelf}')">Delete farmaco</button></td>`;
                    }
                    if (loggedUser.self != undefined) {

                        li += `<td><button type="button" onclick="insertAcquisto('${farmaco.self}')">Acquista farmaco</button></td>`;
                    }
                    li += '</tr>';
                }
                
            })
            ul.innerHTML = li;
        })
        .catch(error => console.error(error));// If there is any error you will catch them here
}

function getFarmacoById(id) {
    const ul = document.getElementById('idFarmaco'); // Get the list where we will place our authors



    ul.textContent = '';
    const url = id;
    let li = '<tr>' + thFarmaco() + '</tr>';
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            li = '<tr>' + modelloFarmaco(data, li) + '</tr>';

            ul.innerHTML = li;


        })
        .catch(error => console.error(error));// If there is any error you will catch them here


}

function insertFarmaco(luogoSelf) {
    //get the farmaco name
    var farmacoName = document.getElementById("farmacoName").value;
    var farmacoModalitauso = document.getElementById("farmacoModalitauso").value;
    var farmacoFoglio_illustrativo = document.getElementById("farmacoFoglio_illustrativo").value;
    var farmacoScadenza = document.getElementById("farmacoScadenza").value;
    var farmacoPrezzo = document.getElementById("farmacoPrezzo").value;
    var farmacoQuantita = document.getElementById("farmacoQuantita").value;

    fetch('../farmaco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: farmacoName,
            modalitauso: farmacoModalitauso,
            foglio_illustrativo: farmacoFoglio_illustrativo,
            scadenza: farmacoScadenza,
            prezzo: farmacoPrezzo,
            quantita: farmacoQuantita,
            luogoId: luogoSelf

        }),
    })
        .then((resp) => {
            console.log(resp);
            loadFarmaci(luogoSelf);
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here

};


function deleteFarmaco(self, luogoSelf) {

    fetch(self, {
        method: 'DELETE'
        ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    }).then((resp) => {
        console.log(resp);
        loadFarmaci(luogoSelf);
        return;
    })
        .catch(error => console.error(error));
}


//LUOGHI

function thLuogo(){
    let li ='<th>ID: </th><th>Indirizzo:</th>';
    li += '<th>Tipo:</th><th>Descrizione:</th>';
    li += '<th>Numero di telefono:</th><th>Distanza:</th> ' ;
    li += thUtente();
    return li;
}

function modelloLuogo(luogo, li){
    li += '<td>' + luogo.self + '</td>';
    li += '<td>' + luogo.indirizzo + '</td>';
    li += '<td>' + luogo.type + '</td>';
    li += '<td>' + luogo.descrizione + '</td>';
    li += '<td>' + luogo.numero_di_telefono + '</td>';
    li += '<td>' + luogo.distanza + '</td>';
    
    
    return li;
}
async function returnLuogo(url, li) {
    li = await fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {

            modelloLuogo(data, li);

        });
    return li;
}
function loadLuoghi(chi) {
    const ul = document.getElementById(chi); // Get the list where we will place our authors

    ul.textContent = '';
    const urlLuogo = '../luogo';
    const url = urlLuogo;
    
    let li = '<tr>'+thLuogo()+'</tr>';
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            // console.log(data);

            // Map through the results and for each run the code below
            data.forEach((luogo) => {
                const url2 = '..' + luogo.utenteId; 
                
                
                if(luogo.type == chi){
                    fetch(url2)
                        .then((resp) => resp.json()) // Transform the data into json
                        .then(function (data) { // Here you get the data to modify as you please
                            li = '<tr>' + modelloLuogo(luogo, li);

                            li = modelloUtente(data, li);
                            let urlDeleteLuogo = luogo.self;
                            if (luogo.type == "Farmacia") {
                                li += `<td><button type="button" onclick="loadFarmaci('${luogo.self}');changeFarmaciaUser('${luogo.utenteId}');mostra('farmacoform')">Vedi Farmaci</button></td>`;
                            }else{
                                if (loggedUser.self!=undefined) {
                                    li += `<td><button type="button" onclick="mostra('nuovaVisita');changeFarmaciaUser('${luogo.self}')">Prenota visita</button></td>`;
                                    
                                }

                            }
                            if ('/utente/' + loggedUser.self == luogo.utenteId) {
                                li += `<td><button type="button" onclick="deleteLuogo('${urlDeleteLuogo}','${luogo.type}')">Delete luogo </button></td>`;

                           
                            }
                            li += '</tr>';
                            ul.innerHTML = li;

                        })
                        .catch(error => console.error(error));// If there is any error you will catch them here


                }

                
            })

        })
        .catch(error => console.error(error));// If there is any error you will catch them here


}
function loadStudi() {
    loadLuoghi('Studio');
    
}
function loadFarmacie() {
    
    loadLuoghi('Farmacia');
}
function insertLuogo() {
    //get the luogo name
    // var luogoId = document.getElementById("luogoId").value;
    if(loggedUser.self!= undefined){
        var luogoUtenteId = loggedUser.self;
        var luogoIndirizzo = document.getElementById("luogoIndirizzo").value;
        var luogoTipo = document.getElementById("luogoTipo").value;
        var luogoDescrizione = document.getElementById("luogoDescrizione").value;
        var luogoNumTel = document.getElementById("luogoNumTel").value;
        var luogoDistanza = document.getElementById("luogoDistanza").value;
        const url = '../luogo?utenteId=' + loggedUser.self + '&token=' + loggedUser.token;

        fetch(url, {
            method: 'POST',

            
            headers: { 'Content-Type': 'application/json',
                        'x-access-token': loggedUser.token
                     },
            body: JSON.stringify({
                indirizzo: luogoIndirizzo,
                type: luogoTipo,
                descrizione: luogoDescrizione,
                numero_di_telefono: luogoNumTel,
                utenteId: luogoUtenteId,
                distanza: luogoDistanza
            }),
        })
            .then((resp) => {
                console.log(resp);
                
                loadLuoghi(luogoTipo);
                let url = 'mostra'+luogoTipo;
                mostra(url); 

                return;
            })
            .catch(error => console.error(error)); // If there is any error you will catch them here
 
    }
    else{
        alert("Fai l'accesso prima");
    }
    
};


function deleteLuogo(self, tipo) {

    fetch(self, {
        method: 'DELETE'
        ,
        headers: { 'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
     },
        body: JSON.stringify({utenteId:loggedUser.self}),
    }).then((resp) => {
        console.log(resp);
        (tipo);
        loadLuoghi(tipo);
        return;
    })
        .catch(error => console.error(error));
}

//MEDICI
function loadMedici() {
    getUtentiAccountType('Medico');

};
//FARMACISTI
function loadFarmacisti() {
    getUtentiAccountType('Farmacista');

};


//UTENTI
function thUtente() {
    let li = '<th>Id:</th>'
    li += '<th>Name:</th>';
    li += '<th>Cognome:</th>';
    li += '<th>Data di nascita:</th>';
    li += '<th>Codice fiscale:</th>';
    li += '<th>email:</th>';
    li += '<th>Password:</th>';
    li += '<th>Tipo di account:</th>';
    li += '<th>Titolo di studio:</th>';
    li += '<th>Indirizzo:</th>';
    li += '<th>SPID:</th>';
    return li;
}
function modelloUtente(utente, li) {
    li += '<td>' + utente.self + '</td>';
    li += '<td>' + utente.name + '</td>';
    li += '<td>' + utente.surname + '</td>';
    li += '<td>' + utente.year + '</td>';
    li += '<td>' + utente.CF + '</td>';
    li += '<td>' + utente.email + '</td>';
    li += '<td>' + utente.password + '</td>';
    li += '<td>' + utente.account_type + '</td>';
    li += '<td>' + utente.titolo_studio + '</td>';
    li += '<td>' + utente.indirizzo + '</td>';
    li += '<td>' + utente.SPID + '</td>';




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

    const url = '../utente/';
    let li = '<tr>' + thUtente() + '</tr>';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {

            data.forEach((utente) => {
                if (utente.account_type == chi) {
                    li = '<tr>' + modelloUtente(utente, li);
                    li += '</tr>';
                }
            })
            ul.innerHTML = li;

        })
        .catch(error => console.error(error));// If there is any error you will catch them here



}
function getUtentiById(id) {
    const ul = document.getElementById('log');

    if (id != undefined) {



        ul.textContent = '';
        const url = '../utente/' + id;
        let li = '<tr>' + thUtente() + '</tr>';
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) { // Here you get the data to modify as you please

                li = '<tr>' + modelloUtente(data, li);


                li += `<td><button type="button" onclick="deleteUtente('${data.self}')">Delete utente</button></td>`;


                li += '</tr>';


                ul.innerHTML = li;

            })
            .catch(error => console.error(error));// If there is any error you will catch them here

    }
    else {
        ul.textContent = 'undefined';
    }


}
function loadPazienti() {
    getUtentiAccountType('Utente');
    getUtentiAccountType('Autenticato');

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
            mostra('mostraUtente');
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



//ACQUISTO

function insertAcquisto(farmacoId) {
    
}


//VISITA    
function insertVisita() {
    var visitaData = document.getElementById("visitaData").value;
  
    fetch('../visita/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: visitaData,
            utenteId: loggedUser.self,
            luogoId: farmaciaUser
        }),
    })
        .then((resp) => {
            alert("Completata");
            console.log(resp);
            
            //loadVisite();
            //mostra('visitaform');
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here

};
function thVisita() {
   let li;
    li = '<th>Id:</th>';
    li += '<th>Data di nascita:</th>';
    li += '<th> utente:</th>';
    li += '<th>luogo:</th>';
    return li;
}
function modelloVisita(visita) {
    let li;
    li = '<td>' + visita.self + '</td>';
    li += '<td>' + visita.data + '</td>';
    li += '<td>' + visita.utenteId + '</td>';
    li += '<td>' + visita.luogoId + '</td>';





    return li;
}
function loadVisite(){
    
        const ul = document.getElementById('visita'); // Get the list where we will place our authors

       
        const url = '../visita/';

        let li = '<tr>' + thVisita() + '</tr>';
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) { // Here you get the data to modify as you please

                // console.log(data);

                // Map through the results and for each run the code below
                data.forEach((visita)=>{
                    if(visita.utenteId == '/utente/'+loggedUser.self){
                        li += '<tr>' + modelloVisita(visita);
                        li += '</tr>';
                    }
                    
                })
                

                ul.innerHTML = li;
                
                /*data.forEach((luogo) => {
                    const url2 = '..' + luogo.utenteId;


                    if (luogo.type == chi) {
                        fetch(url2)
                            .then((resp) => resp.json()) // Transform the data into json
                            .then(function (data) { // Here you get the data to modify as you please
                                li = '<tr>' + modelloLuogo(luogo, li);

                                li = modelloUtente(data, li);
                                let urlDeleteLuogo = luogo.self;
                                if (luogo.type == "Farmacia") {
                                    li += `<td><button type="button" onclick="loadFarmaci('${luogo.self}');changeFarmaciaUser('${luogo.utenteId}');mostra('farmacoform')">Vedi Farmaci</button></td>`;
                                } else {
                                    if (loggedUser.self != undefined) {
                                        li += `<td><button type="button" onclick="mostra('nuovaVisita');changeFarmaciaUser('${luogo.self}')">Prenota visita</button></td>`;

                                    }

                                }
                                if ('/utente/' + loggedUser.self == luogo.utenteId) {
                                    li += `<td><button type="button" onclick="deleteLuogo('${urlDeleteLuogo}','${luogo.type}')">Delete luogo </button></td>`;


                                }
                                li += '</tr>';
                                ul.innerHTML = li;

                            })
                            .catch(error => console.error(error));// If there is any error you will catch them here


                    }


                })*/

            })
            .catch(error => console.error(error));// If there is any error you will catch them here


}
