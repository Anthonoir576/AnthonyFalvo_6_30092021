/* ##########   MES DECLARATIONS   ################ */

// importation package => mongoose
const mongoose = require('mongoose');

// dependance permettant le controle dun email unique
const uniqueValidator = require('mongoose-unique-validator');

/* ################################################ */

/*                    *******                       */

/* ################  SCHEMA  ###################### */

// Fonction Schema fournis par le package mongoose permet de créer un schema type que l'on a besoin pour la création d'un nouvel utilisateur
const userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password:{ type: String, required: true }

});

// Controle adresse email unique :
userSchema.plugin(uniqueValidator);

/* ################################################ */

/*                    *******                       */

/* ##############    EXPORT     ################### */

// Export du shéma de l'utilisateur  
module.exports = mongoose.model('User', userSchema);

/* ################################################ */