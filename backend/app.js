
/* ##########   MES DECLARATIONS   ################ */

// importation package => express
const express = require('express');

// application express
const app = express();

// importation package => mongoose
const mongoose = require('mongoose');

// importation des routes concernant les sauces suivant les différentes requêtes
const sauceRoutes = require('./routes/sauceRoute');
// importation des routes concernant les users suivant les différentes requêtes
const userRoutes = require('./routes/userRoute');
// PATH IMAGE
const path = require('path');

// Importation de la dépendance dotenv
const environnement = require('dotenv');
environnement.config();

// Connection a la DB mongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@projet-06-openclassroom.bum0m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* ################################################ */



/* ##############    CORS   ####################### */

// Permet notamment d'eviter les requêtes indésirables
// Autorisation de l'utilisation de l'api grace au argument passé aux différents headers et evite la sécurité CORS 
app.use((request, response, next) => {

    // autorisation à '*' donc tout le monde :
    response.setHeader('Access-Control-Allow-Origin', '*');
    // autorisation de certain en tête dans les requêtes :
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // autorisation de certaine methodes ou verbe attribué aux différentes requêtes :
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();

});

/* ################################################ */



/* #####  CONVERTION DU CORP DE LA REQUETE   ###### */

// suite a la maj 4.16 bodyParser est intégrer a express
// Permet de convertir le corp de la requête en objet json exploitable
app.use(express.json());

/* ################################################ */



/* #############   MIDDLEWARE   ################### */

app.use('/images', express.static(path.join(__dirname, 'images')));

// toute les routes effectuer sur les sauces
app.use('/api/sauces', sauceRoutes);
// toute les routes effectuer sur les users
app.use('/api/auth', userRoutes);

/* ################################################ */




/* ##############    EXPORT     ################### */

// exportation de la const app pour la recuperer sur nimporte quel fichier
module.exports = app;

/* ################################################ */