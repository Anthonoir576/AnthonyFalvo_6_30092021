
/** ---- JS DOCUMENTATION SAUCE.JS ----
 * 
 * 01. Importation mongoose
 * 
 * 02. Schema sauce, permettant de respecter une certaine structure a envoyé dans la base de donnée
 * 
 * 03. Export du modèle de sauce
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const mongoose = require('mongoose');                  // - 01 -
/* ################################################ */



/* ################  SCHEMA  ###################### */
const sauceSchema = mongoose.Schema({                  // - 02 -  

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
module.exports = mongoose.model('Sauce', sauceSchema); // - 03 -
/* ################################################ */