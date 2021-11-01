
/** ---- JS DOCUMENTATION AUTH.JS ----
 * 
 * 01. 
 * 
 * 02.  
 * 
 * 03.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const jwt = require('jsonwebtoken');                // 01. Import JWT

const environnement = require('dotenv')             // 02. Import .env
environnement.config();
/* ################################################ */



/* ############   MIDDLEWARE    ################### */

module.exports = (request, response, next) => {    // 03. EXPORT    

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