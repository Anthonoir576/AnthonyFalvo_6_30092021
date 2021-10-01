
/* ##########   MES DECLARATIONS   ################ */

const express = require('express');
const router = express.Router();


// importation modèle de SAUCE depuis le fichier js
const Sauce = require('../models/sauce');

/* ################################################ */

/*                    *******                       */

/* ##############   MES ROUTES   ################## */

/* !!!!!  VERIFIER SI LE USERID EST DEDANS AU TEST !!!!!!!!!! */
// Creation d'une nouvelle sauce dans la DB
router.post('/', (request, response, next) => {
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
router.put('/:id', (request, response, next) => {

    Sauce.updateOne({ _id: request.params.id }, { ...request.body, _id: request.params.id })
    .then(() => response.status(200).json({ message: 'Sauce modifiée ! '}))
    .catch( error => response.status(400).json({ error }));

});

// Suppression d'une sauce de la DB
router.delete('/:id', (request, response, next) => {

    Sauce.deleteOne({ _id: request.params.id})
        .then(() => response.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => response.status(400).json({ error }));

});

// Affichage d'une sauce de la DB
router.get('/:id', (request, response, next) => {

    Sauce.findOne({ _id: request.params.id })
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({ error }));

});

// Recupere toutes les sauces de la DB
router.get('/', (request, response, next) => {

    Sauce.find()
        .then(sauces => response.status(200).json(sauces))
        .catch(error => response.status(400).json({ error }));

});

/* ################################################ */

/*                    *******                       */

/* ##############    EXPORT     ################### */

// exportation de la const router pour la recuperer sur nimporte quel fichier
module.exports = router;

/* ################################################ */
