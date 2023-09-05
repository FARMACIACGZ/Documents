//ACQUISTO

function insertAcquisto(farmacoId) {
    var acquistoData = Date.now();
    var acquistoUtenteId = loggedUser.self;
    
    var acquistoFarmacoId = farmacoId;
    url = '../acquisto?utenteId=' + loggedUser.self + '&token=' + loggedUser.token;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           
            data: acquistoData,
            utenteId: acquistoUtenteId,
            farmacoId: acquistoFarmacoId
        }),
    })
        .then((resp) => {
            console.log(resp);

            loadAcquisti();
            mostra('acquistoform');
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here

};
function thAcquisto() {
    let li;
    li = '<th>Id:</th>';
    li += '<th>Data acquisto</th>';
    li += '<th> utente:</th>';
    li += '<th>Farmaco:</th>';
    li += thFarmaco();
    return li;
}
function modelloAcquisto(acquisto,li) {
    
    li = '<td>' + acquisto.self + '</td>';
    li += '<td>' + acquisto.data + '</td>';
    li += '<td>' + acquisto.utenteId + '</td>';
    li += '<td>' + acquisto.farmacoId + '</td>';

    



    return li;
}
function loadAcquisti() {

    const ul = document.getElementById('acquisto'); // Get the list where we will place our authors
   

    url = '../acquisto?token=' + loggedUser.token;
    let li = '<tr>' + thAcquisto() + '</tr>';
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { 
            data.forEach((acquisto) => {
                
                const urlFarmaco = '..' + acquisto.farmacoId;
                fetch(urlFarmaco)
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function (farmaco) {
                        // Here you get the data to modify as you please
                        if (acquisto.utenteId == '/utente/' + loggedUser.self) {
                            li += '<tr>' + modelloAcquisto(acquisto, li);

                            li = modelloFarmaco(farmaco, li);


                            li += '</tr>';
                        }
                        ul.innerHTML = li;
                        

                    })
            
            })

        })
        .catch(error => console.error(error));// If there is any error you will catch them here


}