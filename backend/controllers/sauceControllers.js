
/** ---- JS DOCUMENTATION SAUCECONTROLLERS.JS ----
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
 * 06.
 * 
 * 07.
 * 
 * 08.
 * 
 * 09.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const Sauce = require('../models/Sauce');           // 01. Import modèle SAUCE
const fs    = require('fs');                        // 02. File system 
const jwt   = require('jsonwebtoken');              // 03. Import JWT
/* ################################################ */



/* ############   CONTROLLERS   ################### */
exports.createSauce =  (request, response, next) => {       // 04. Creation SAUCE

    const sauceObject = JSON.parse(request.body.sauce);
    delete sauceObject._id;
 
    let nom = sauceObject.name;
    let manufacturer = sauceObject.manufacturer;
    let description = sauceObject.description;
    let mainPepper = sauceObject.mainPepper;

    // Condition de verification pour eviter quun user met que des espaces 
    if (nom.trim().length >= 3 &&
        manufacturer.trim().length >= 3 &&
        description.trim().length >= 3 &&
        mainPepper.trim().length >= 3) {

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

    } else {

        try {

            // Suppression img si condition pas respecter
            const filename = request.file.filename;

            fs.unlink(`images/${filename}`,(error) => {

                if (error) { 
                    
                    throw error
                    
                };

                console.log('Fichier supprimé !');
            });

            throw 'Requête non autorisée !';


        } catch (error) {

            response.status(401).json({ error: error | 'Requête non autorisée !'});

        };


    };

};

exports.likeOrDislikeSauce = (request, response, next) => { // 05. Like/Dislike SAUCE

    const like = request.body.like;
    const userId = request.body.userId;
    let userChoice;

    Sauce.findOne({ _id: request.params.id })
        .then( sauce => {

            const arrayLike = sauce.usersLiked;
            const arrayDislike = sauce.usersDisliked;

            // si user aime la sauce
            if (like === 1 && !arrayLike.includes(userId)) {

                arrayLike.push(userId);
                sauce.likes++;
                userChoice = 'L\'utilisateur aime la sauce';
            
            // si user n'aime pas la sauce    
            } else if (like === -1 && !arrayLike.includes(userId)) {

                arrayDislike.push(userId);
                sauce.dislikes++;
                userChoice = 'L\'utilisateur n\'aime la sauce';

            // si user change sont like/dislike    
            } else if (like === 0) {

                if (arrayLike.includes(userId)) {

                    arrayLike.pull(userId);
                    sauce.likes--;
                    userChoice = 'L\'utilisateur a retirer la mention "j\'aime" sur la sauce';

                } else if (arrayDislike.includes(userId)) {

                    arrayDislike.pull(userId);
                    sauce.dislikes--;
                    userChoice = 'L\'utilisateur a retirer la mention "j\'aime pas" sur la sauce';

                };

            };

            sauce.save()
                 .then(() => response.status(200).json({ message: userChoice }))
                 .catch(error => response.status(500).json({ error }));

        })
        .catch(error => response.status(401).json({message : error}));

};

exports.modifySauce = (request, response, next) => {        // 06. Update SAUCE

    const sauceObject = request.file ?
    {

        ...JSON.parse(request.body.sauce),
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`


    } : { ...request.body };
    
    
    const sauceObjectModifier = sauceObject;
    
    let nom = sauceObjectModifier.name;
    let manufacturer = sauceObjectModifier.manufacturer;
    let description = sauceObjectModifier.description;
    let mainPepper = sauceObjectModifier.mainPepper;


    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId;

    
    // Condition de verification pour eviter quun user met que des espaces 
    if (nom.trim().length >= 3 &&
        manufacturer.trim().length >= 3 &&
        description.trim().length >= 3 && 
        mainPepper.trim().length >= 3) {

        Sauce.findOne({ _id: request.params.id})
        .then(sauce => {

            const filename = sauce.imageUrl.split('/images/')[1];

            // VERIFICATION Si user.id correspond au createur de la sauce
            if (userId == sauce.userId) {

                // Si aucune photo => update 
                if (sauceObject.imageUrl == undefined) {

                    Sauce.updateOne({ _id: request.params.id }, { ...sauceObject, _id: request.params.id })
                    .then(() => response.status(200).json({ message: 'Sauce modifiée ! '}))
                    .catch( error => response.status(400).json({ error }));

                // Suppression de la photo précédente avant => update    
                } else {

                    fs.unlink(`images/${filename}`, () => {
                        Sauce.updateOne({ _id: request.params.id }, { ...sauceObject, _id: request.params.id })
                        .then(() => response.status(200).json({ message: 'Sauce modifiée ! '}))
                        .catch( error => response.status(400).json({ error }));
                    });

                };
            
            // SINON ERREUR
            } else if (userId !== sauce.userId) {

                return response.status(403).json({ message : 'unauthorized request'});

            };

        })
        .catch( error => response.status(500).json({ error }));

    
    // si il met des espaces, et que le if n'est pas pas rempli, alors retour a la valeur d'origine déjà renseigner     
    } else {

        Sauce.findOne({ _id: request.params.id })
        .then(sauce => response.status(200).json(sauce))
        .catch(error => response.status(404).json({ error }));

    };

};

exports.deleteSauce =  (request, response, next) => {       // 07. Delete SAUCE

    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId;
    
    Sauce.findOne({ _id: request.params.id})
        .then(sauce => {

            // VERIFICATION Si user.id correspond au createur de la sauce
            if (userId == sauce.userId) {

                const filename = sauce.imageUrl.split('/images/')[1];

                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: request.params.id})
                    .then(() => response.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => response.status(400).json({ error }));
                });
            
            // SINON ERREUR
            } else if (userId !== sauce.userId) {

                return response.status(403).json({ message : 'unauthorized request'});

            };
        
        })
        .catch( error => response.status(500).json({ error }));



};

exports.getOneSauce = (request, response, next) => {        // 08. LIRE SAUCE

    Sauce.findOne({ _id: request.params.id })
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({ error }));

};

exports.getAllSauce =  (request, response, next) => {       // 09. LIRE LES SAUCES

    Sauce.find()
        .then(sauces => response.status(200).json(sauces))
        .catch(error => response.status(400).json({ error }));

};
/* ################################################ */