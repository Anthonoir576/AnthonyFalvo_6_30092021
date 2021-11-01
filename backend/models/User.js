
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