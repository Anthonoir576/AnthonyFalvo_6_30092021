
/** ---- JS DOCUMENTATION PASSWORD.JS ----
 * 
 * 01. Importation de la dépendance password-validator
 * 
 * 02. Importation de la dépendance mongooseError
 * 
 * 03. Création d'un schema permettant de donné certaine condition, tel que le nombre minimum de caractère, majuscule, minuscule etc.. 
 * 
 * 04. Exportation du schema 
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const password = require('password-validator');     // - 01 -
const mongooseError = require('mongoose-error');    // - 02 - 
/* ################################################ */



/* ################  SCHEMA  ###################### */
const passwordSchema = new password();              // - 03 -

passwordSchema
.is().min(4)
.is().max(20)
// .has().uppercase()                              
// .has().lowercase()                             
// .has().digits(2)                               
// .has().not().spaces()                           
// .is().not().oneOf(['Passw0rd', 'Password123', '0000', '1234', 'motdepasse', 'MotDePasse', 'motdepasse123', 'MotDePasse123']); 
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = (request, response, next) => {     // - 04 -

    try {
        
        if(passwordSchema.validate(request.body.password)) {

            return next();
    
        } else {
    
            throw 'error';
    
        };

    } catch (error) {
        
        mongooseError(
                
            response.status(403).json({ message : 'ERREUR : Le mot de passe doit contenir au minimum 4 caractères, et au maximum 20 caractères !'})
            
        );

    };

};
/* ################################################ */