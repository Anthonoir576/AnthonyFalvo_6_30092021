/* ##########   MES DECLARATIONS   ################ */

const express = require('express');

const app = express();

/* ################################################ */

app.use((request, response, next) => {

    console.log('requete recu');
    next();

});

app.use((request, response, next) => {

    response.status(201);
    next();

});

app.use((request, response, next) => {

    response.json({message: 'ok'});
    next();

});


app.use((request, response) => {

    console.log('reponse envoyé succès');
  
});


/* ##############    EXPORT     ################### */

// exportation de la const app pour la recuperer sur nimporte quel fichier
module.exports = app;

/* ################################################ */