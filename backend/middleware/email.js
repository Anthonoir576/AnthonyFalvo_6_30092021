
/** ---- JS DOCUMENTATION EMAIL.JS ----
 * 
 * 01. Importation de la dépendance mongoose-error
 * 
 * 02. Regex contrôle e-mail . Renvoi true/false en fonction de la saisi utilisateur.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const mongooseError = require('mongoose-error');    // - 01 - 
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = (request, response, next) => {     // - 02 -

    let email = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}[ ]{0,2}$', 'g');
    let testEmail = email.test(request.body.email);

    try {
        
        if (testEmail) {

            next();

        } else {

            throw 'error';

        };

    } catch (error) {
        
        mongooseError(
                
            response.status(403).json({ message : 'ERREUR : l\'adresse e-mail n\'est pas conforme !'})
            
        );

    };

};
/* ################################################ */