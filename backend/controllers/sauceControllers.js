
/* ##########   MES DECLARATIONS   ################ */

// importation modèle de SAUCE depuis le fichier js
const Sauce = require('../models/Sauce');

const fs = require('fs');

// Importation modèle de USER depuis le fichier js
const User = require('../models/User')

/* ################################################ */



/* ############   CONTROLLERS   ################### */
// Creation d'une nouvelle sauce dans la DB
exports.createSauce =  (request, response, next) => {
    const sauceObject = JSON.parse(request.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({

        ...sauceObject,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`,
        likes: 0,
        dislikes : 0,
        usersLiked : [], 
        usersDisliked : [] 

    });

    sauce.save()
        .then(() => response.status(201).json({ message: 'Sauce ajoutée !'}))
        .catch(error => response.status(400).json({ error }));

};

// aime ou pas les sauces
exports.likeOrDislikeSauce = (request, response, next) => {

    Sauce.findOne({ _id: request.params.id })
        .then( sauce => {

            console.log(sauce.usersDisliked, sauce.usersLiked);
            console.log(sauce.usersLiked[0]);
            console.log(sauce.usersDisliked.length);
            console.log(sauce.usersLiked.length);
            
            for (let i = 0; i <= sauce.usersLiked.length && i <= sauce.usersDisliked.length; i++) {

                // user trouvé   
                if (sauce.usersLiked[i] == request.body.userId || sauce.usersDisliked[i] == request.body.userId) { 

                    return console.log('user trouvé');

                // Pas encore de like dislike de cet user 
                } else if ((sauce.usersLiked[i] >= sauce.usersliked.length-- && sauce.usersDisliked[i] >= sauce.usersDisliked.length--) || (sauce.usersLiked.length == 0 && sauce.usersDisliked.length == 0)) {

                    return console.log('Aucun user trouvé');
    
                };
            };

        })
        .catch(error => response.status(404).json({message : error}));

};

// Modification d'une sauce de la DB
exports.modifySauce = (request, response, next) => {

    const sauceObject = request.file ?
    {

        ...JSON.parse(request.body.sauce),
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`


     } : { ...request.body };
    Sauce.updateOne({ _id: request.params.id }, { ...sauceObject, _id: request.params.id })
    .then(() => response.status(200).json({ message: 'Sauce modifiée ! '}))
    .catch( error => response.status(400).json({ error }));

};

// Suppression d'une sauce de la DB
exports.deleteSauce =  (request, response, next) => {
    
    Sauce.findOne({ _id: request.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: request.params.id})
                .then(() => response.status(200).json({ message: 'Sauce supprimée !'}))
                .catch(error => response.status(400).json({ error }));
            });
        })
        .catch( error => response.status(500).json({ error }));



};

// Recupere d'une sauce de la DB
exports.getOneSauce = (request, response, next) => {

    Sauce.findOne({ _id: request.params.id })
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({ error }));

};

// Recupere toutes les sauces de la DB
exports.getAllSauce =  (request, response, next) => {

    Sauce.find()
        .then(sauces => response.status(200).json(sauces))
        .catch(error => response.status(400).json({ error }));

};

/* ################################################ */