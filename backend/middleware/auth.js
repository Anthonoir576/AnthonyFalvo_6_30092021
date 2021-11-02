
/** ---- JS DOCUMENTATION AUTH.JS ----
 * 
 * 01. Importation de JsonWebToken
 * 
 * 02. Gestion des erreurs via mongooseError 
 * 
 * 03. Appel de la variable d'environnement .env ( ou .env.example), nous permettant de ne pas mélangé nos informations sensible, via un dépôt tel que github. Ainsi garder certain élément "confidentiel", tel que les données de connection mongoDB admin, les mots de passes, etc.. Voir .env.example pour en savoir plus.
 * 
 * 04. Contrôle du token utilisateur a chaque route requise. La variable token recupere un tableau contenant bearer et le token, on recupere l'index [1] donc le token. decodedToken decode le token via la clé secret, ainsi userID correspond au token decoder et recupere donc l'userId de l'utilisateur correspondant.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const jwt           = require('jsonwebtoken');      // - 01 -
const mongooseError = require('mongoose-error');    // - 02 -

const environnement = require('dotenv')             // - 03 -
environnement.config();
/* ################################################ */



/* ############   MIDDLEWARE    ################### */

module.exports = (request, response, next) => {     // - 04 -

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

        mongooseError(
                
            response.status(401).json({ error: error || '[ ERREUR ] : ECHEC Authentification '})
            
        );

    }

};

/* ################################################ */