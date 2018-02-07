const express = require('express');
const app = express();
app.use(express.static('public'));
const fs = require('fs');

app.get('/formulaire', (req, res) => {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/" + "01_html.htm" );
})

app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

app.get('/traiter_get', (req, res) => {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel
 };
console.log(reponse);
 res.end(JSON.stringify(reponse + ","));

 fs.readFile('membres.json', 'utf-8', (err,data) => {
    if (err) throw(err);
    let liste = JSON.parse(data);
    liste.push(reponse);
    console.log('sauvé');

    fs.readFile('membres.json', JSON.stringify(liste), (err, data) => {
        if (err) throw(err);
    }) ;

}) ;

});



app.get('/membres', (req, res) => {

    fs.readFile('membres.json', 'utf8', (err, data) => {
        if (err) throw(err);
        let membres = JSON.parse(data);
    }) ;

})

const server = app.listen(8081, () => {
 let host = server.address().address
 let port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})