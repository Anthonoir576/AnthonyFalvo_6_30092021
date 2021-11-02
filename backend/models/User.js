
/** ---- JS DOCUMENTATION USER.JS ----
 * 
 * 01. Importation de mongoose
 * 
 * 02. Importation de mongoose-unique-validator, permet de verifier si un email est bien unique dans la base de données.
 * 
 * 03. Schema utilisateur
 * 
 * 04. Mise en place du controle d'email unique
 * 
 * 05. Export du modèle utilisateur
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const mongoose   = require('mongoose');                  // - 01 -
const uniqueMail = require('mongoose-unique-validator'); // - 02 -
/* ################################################ */



/* ################  SCHEMA  ###################### */
const userSchema = mongoose.Schema({                     // - 03 -

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

userSchema.plugin(uniqueMail);                           // - 04 -
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = mongoose.model('User', userSchema);     // - 05 -
/* ################################################ */