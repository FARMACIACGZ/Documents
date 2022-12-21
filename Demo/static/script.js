function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    fetch('authentication', {
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
            loadLendings();
            return;
        }).catch(error => console.error(error));
};