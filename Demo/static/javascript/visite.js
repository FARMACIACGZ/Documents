//VISITA    
function insertVisita() {
    var visitaData = document.getElementById("visitaData").value;
    var visitaUtenteId = loggedUser.self;
    var visitaLuogoId = farmaciaUser;
    url = '../visita?utenteId=' + loggedUser.self + '&token=' + loggedUser.token;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: visitaData,
            utenteId: visitaUtenteId,
            luogoId: visitaLuogoId
        }),
    })
        .then((resp) => {
            console.log(resp);
            
            loadVisite();
            mostra('visitaform');
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here

};
function thVisita() {
   let li;
    li = '<th>Id:</th>';
    li += '<th>Data visita</th>';
    li += '<th> utente:</th>';
    li += '<th>luogo:</th>';
    li += thUtente();
    li+= thLuogo();
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

       
         url = '../visita?utenteId=' + loggedUser.self + '&token=' + loggedUser.token;


        let li = '<tr>' + thVisita() + '</tr>';
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) { // Here you get the data to modify as you please

                // console.log(data);

                // Map through the results and for each run the code below
                

                data.forEach((visita)=>{
                    
                    if(visita.utenteId == '/utente/'+loggedUser.self){

                        const urlLuogo = '..'+visita.luogoId;
                        
                        fetch(urlLuogo)
                            .then((resp) => resp.json()) // Transform the data into json
                            .then(function (luogo) {
                                
                                    
                                    const url2 = '..' + visita.utenteId;

                                    
                                    if (luogo.type == 'Studio') {
                                    fetch(url2)
                                        .then((resp) => resp.json()) // Transform the data into json
                                        .then(function (data) { // Here you get the data to modify as you please
                                            
                                            li += '<tr>' + modelloVisita(visita);


                                            li = modelloUtente(data, li);
                                            li = modelloLuogo(luogo, li);

                                            
                                            li += '</tr>';
                                            ul.innerHTML = li;

                                        })
                                    .catch(error => console.error(error));// If there is any error you will catch them here 
                                    }   
                                
                            })
                    }
                    
                })
                


                

            })
            .catch(error => console.error(error));// If there is any error you will catch them here


}