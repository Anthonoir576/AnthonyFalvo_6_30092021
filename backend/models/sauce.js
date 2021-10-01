
/* ##########   MES DECLARATIONS   ################ */

// importation package => mongoose
const mongoose = require('mongoose');

/* ################################################ */

/*                    *******                       */

/* ################  SCHEMA  ###################### */

// Fonction Schema fournis par le package mongoose permet de créer un schema type que l'on a besoin pour la création d'une nouvelle sauce
const sauceSchema = mongoose.Schema({

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

/*                    *******                       */

/* ##############    EXPORT     ################### */

// Export du shéma de sauce créer Sauce serra le nom de l'objet crée et saucheSchema le modèle a utilisé 
module.exports = mongoose.model('Sauce', sauceSchema);

/* ################################################ */