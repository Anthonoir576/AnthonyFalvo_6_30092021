/* ##########   MES DECLARATIONS   ################ */
const mongoose   = require('mongoose');                  // 01. Importation mongoose
const uniqueMail = require('mongoose-unique-validator'); // 02. dependance unique-validator
/* ################################################ */



/* ################  SCHEMA  ###################### */
const userSchema = mongoose.Schema({                     // 03. Schema USER     

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

userSchema.plugin(uniqueMail);                           // 04. Controle EMAIL unique
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = mongoose.model('User', userSchema);    // 05. EXPORT
/* ################################################ */