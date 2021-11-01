
/** ---- JS DOCUMENTATION USER.JS ----
 * 
 * 01. 
 * 
 * 02.  
 * 
 * 03.
 * 
 * 04.
 * 
 * 05.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const mongoose   = require('mongoose');                  // 01. Import mongoose
const uniqueMail = require('mongoose-unique-validator'); // 02. Import unique mail
/* ################################################ */



/* ################  SCHEMA  ###################### */
const userSchema = mongoose.Schema({                     // 03. Schema USER     

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

userSchema.plugin(uniqueMail);                           // 04. EMAIL unique
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = mongoose.model('User', userSchema);    // 05. EXPORT
/* ################################################ */