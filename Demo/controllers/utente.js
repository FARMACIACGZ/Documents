


const utente = require('../models/utente');

const newUtente = (req, res) => {
    utente.findOne({name: req.body.name}, (err,data)=> {
        if(!data){
            const newUtente = new utente({
                name: req.body.name,
                surname: req.body.surname,
                year: req.body.year,
                CF: req.body.CF, 
                email: req.body.email,
                password: req.body.password,
                account_type: req.body.account_type,
            })
            
            newUtente.save((err,data)=>{
                if (err) return res.json({ Error:err });
                return res.json(data);
            })
            console.log("Utente registrato correttamente");



        }else{
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "Utente already exists" });
        
            
        }




    })
}

//GET all utentes
const getAllUtente = (req, res) => {
    utente.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//DELETE utentes
const deleteAllUtente = (req, res) => {
    utente.deleteMany({}, err => {
        if (err) {
            return res.json({ message: "Complete delete failed" });
        }
        return res.json({ message: "Complete delete successful" });
    })
};

const getOneUtente = (req, res) => {
    let name = req.params.name; //get the utente name

    //find the specific utente with that name
    utente.findOne({ name: name }, (err, data) => {
        if (err || !data) {
            console.log("utente doesn't exist.");
            return res.json({ message: "utente doesn't exist." });
        }
        else {
            console.log("Utente trovato");
            return res.json(data); //return the utente object if found
        }
    });
};


//DELETE '/utente/:name'
const deleteOneUtente = (req, res, next) => {

    // Query for a utente that has name
    let utenteName = req.params.name;
    var query = { name: utenteName };

    const result = utente.deleteOne(query);
    utente.deleteOne(query, (err, collection) => {
        if (err) {
            throw err;
        }
        else {
            console.log("utente deleted successfully");
            res.json({ message: "DELETE 1 utente" });
        }

    });


};






//export controller functions
module.exports = {
    getAllUtente,
    newUtente,
    deleteAllUtente,
    getOneUtente,
    deleteOneUtente
};

