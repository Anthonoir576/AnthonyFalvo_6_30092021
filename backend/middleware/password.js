
/** ---- JS DOCUMENTATION PASSWORD.JS ----
 * 
 * 01. Importation de la dépendance password-validator
 * 
 * 02. Création d'un schema permettant de donné certaine condition, tel que le nombre minimum de caractère, majuscule, minuscule etc.. 
 * 
 * 03. Exportation du schema 
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const password = require('password-validator');     // 01. Dépendance contrôle MDP
/* ################################################ */



/* ################  SCHEMA  ###################### */
const passwordSchema = new password();              // 02. Schema contrôle password

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
module.exports = (request, response, next) => {     // 03. Export schema         

    if(passwordSchema.validate(request.body.password)) {

        return next();

    } else {

        return response.status(40).json({ error: " Le mot de passe doit contenir au minimum 4 caractères, et au maximum 20 caractères"});

    };


};
/* ################################################ */