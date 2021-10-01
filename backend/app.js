
/* ##########   MES DECLARATIONS   ################ */

// importation package => express
const { response } = require('express');
const express = require('express');

// application express
const app = express();

// importation package => mongoose
const mongoose = require('mongoose');

// importation modèle de SAUCE depuis le fichier js
const Sauce = require('./models/sauce');

// Connection a la DB mongoDB Atlas
mongoose.connect('mongodb+srv://Anthonoir576:475719711993@projet-06-openclassroom.bum0m.mongodb.net/Projet-06-Openclassrooms?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* ################################################ */

/*                    *******                       */

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

/*                    *******                       */

/* #####  CONVERTION DU CORP DE LA REQUETE   ###### */

// suite a la maj 4.16 bodyParser est intégrer a express
// Permet de convertir le corp de la requête en objet json exploitable
app.use(express.json());

/* ################################################ */

/* !!!!!  VERIFIER SI LE USERID EST DEDANS AU TEST !!!!!!!!!! */
// Creation d'une nouvelle sauce dans la DB
app.post('/api/sauces', (request, response, next) => {
    delete request.body._id;
    const sauce = new Sauce({

        ...request.body,
        likes: 0,
        dislikes : 0,
        usersLiked : [], 
        usersDisliked : [] 

    });

    sauce.save()
        .then(() => response.status(201).json({ message: 'Sauce ajoutée !'}))
        .catch(error => response.status(400).json({ error }));

});

// Modification d'une sauce de la DB
app.put('/api/sauces/:id', (request, response, next) => {

    Sauce.updateOne({ _id: request.params.id }, { ...request.body, _id: request.params.id })
    .then(() => response.status(200).json({ message: 'Sauce modifiée ! '}))
    .catch( error => response.status(400).json({ error }));

});

// Suppression d'une sauce de la DB
app.delete('/api/sauces/:id', (request, response, next) => {

    Sauce.deleteOne({ _id: request.params.id})
        .then(() => response.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => response.status(400).json({ error }));

});

// Affichage d'une sauce de la DB
app.get('/api/sauces/:id', (request, response, next) => {

    Sauce.findOne({ _id: request.params.id })
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({ error }));

});

// Recupere toutes les sauces de la DB
app.get('/api/sauces', (request, response, next) => {

    Sauce.find()
        .then(sauces => response.status(200).json(sauces))
        .catch(error => response.status(400).json({ error }));

});

/*                    *******                       */

/* ##############    EXPORT     ################### */

// exportation de la const app pour la recuperer sur nimporte quel fichier
module.exports = app;

/* ################################################ */