/* ##########   MES DECLARATIONS   ################ */

const express = require('express');

const app = express();

/* ################################################ */



app.use((request, response) => {

    response.json({message: 'ok'})

});



/* ##############    EXPORT     ################### */

// exportation de la const app pour la recuperer sur nimporte quel fichier
module.exports = app;

/* ################################################ */