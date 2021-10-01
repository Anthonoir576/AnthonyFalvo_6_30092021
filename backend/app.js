/* ##########   MES DECLARATIONS   ################ */

// import express
const express = require('express');

// application express
const app = express();

/* ################################################ */




/* ##############    CORS   ####################### */
// Permet notamment d'eviter les requêtes indésirables
// Autorisation de l'utilisation de l'api grace au argument passé aux différents headers et evite la sécurité CORS 
app.use((request, response, next) => {

    // autorisation à '*' donc tout le monde :
    response.setHeader('Access-Control-Allow-Origin', '*');
    // autorisation de certain en tête dans les requêtes :
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // autorisation de certaine methodes ou verbe attribué aux différentes requêtes :
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();

});

/* ################################################ */



/* #####  CONVERTION DU CORP DE LA REQUETE   ###### */

// suite a la maj 4.16 bodyParser est intégrer a express
// Permet de convertir le corp de la requête en objet json exploitable
app.use(express.json());

/* ################################################ */


app.post('/api/stuff', (request, response, next) => {

    console.log(request.body);
    response.status(201).json({ message: 'salut'});

});


/* ##############    EXPORT     ################### */

// exportation de la const app pour la recuperer sur nimporte quel fichier
module.exports = app;

/* ################################################ */