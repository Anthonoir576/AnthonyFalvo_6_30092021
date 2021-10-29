
/* ##########   MES DECLARATIONS   ################ */

// Dépendance 
const passwordValidator = require('password-validator');

/* ################################################ */



/* ################  SCHEMA  ###################### */

const passwordSchema = new passwordValidator();


passwordSchema
.is().min(4)
.is().max(20)
// .has().uppercase()                              
// .has().lowercase()                             
// .has().digits(2)                               
// .has().not().spaces()                           
// .is().not().oneOf(['Passw0rd', 'Password123']); 


/* ################################################ */



/* ##############    EXPORT     ################### */

module.exports = (request, response, next) => {

    if(passwordSchema.validate(request.body.password)) {

        return next();

    } else {

        return response.status(40).json({ error: " Le mot de passe doit contenir au minimum 4 caractères, et au maximum 20 caractères"});

    };


};

/* ################################################ */