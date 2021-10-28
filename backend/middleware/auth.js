
/* ##########   MES DECLARATIONS   ################ */

// Importantion jwt token
const jwt = require('jsonwebtoken');

// Importation de la dépendance dotenv
const environnement = require('dotenv');
environnement.config();

/* ################################################ */



/* ############   MIDDLEWARE    ################### */

module.exports = (request, response, next) => {

    try {

        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = decodedToken.userId;

        if (request.body.userId && request.body.userId !== userId) {

            throw ' User ID non valable !';

        } else {

            next();

        }

    } catch (error) {

        response.status(401).json({ error: error | 'Requête non authentifiée'});

    }

};

/* ################################################ */