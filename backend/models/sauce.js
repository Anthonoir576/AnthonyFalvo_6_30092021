
/** ---- JS DOCUMENTATION SAUCE.JS ----
 * 
 * 01. 
 * 
 * 02.  
 * 
 * 03.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const mongoose = require('mongoose');                // 01.
/* ################################################ */



/* ################  SCHEMA  ###################### */
const sauceSchema = mongoose.Schema({                // 02.  

    userId: { type: String, required: true },
    name: { type: String, required: true }, 
    manufacturer: { type: String, required: true }, 
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true }, 
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes : { type: Number },
    usersLiked : [ { type: String } ], 
    usersDisliked : [ { type: String } ] 

});
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = mongoose.model('Sauce', sauceSchema); // 03.
/* ################################################ */