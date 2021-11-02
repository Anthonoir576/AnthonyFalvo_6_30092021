
/** ---- JS DOCUMENTATION SAUCECONTROLLERS.JS ----
 * 
 * 01. Importation du modèle de sauce
 * 
 * 02. Importation de fil system de node.js
 * 
 * 03. Importation de JWT afin de verifier une deuxième fois au moment de la modification ou suppression d'une sauce que l'utilisateur et bien le propriétaire.
 * 
 * 04. Importation de mongooseError, afin de traiter certaines erreurs.
 * 
 * 05. CREATION SAUCE : créer une sauce uniquement si l'utilisateur utilise des caractères, sinon la sauce n'est pas crée, et l'image enregistrer par multer est supprimer.
 * 
 * 06. LIKE OU DISLIKE SAUCE : Permet de liker nou disliker une sauce via une condition simple
 * 
 * 07. MODIFIER SAUCE : modifie une sauce uniquement si les caractères sont correctes, et si l'utilisateur et bien le propriétaire de la sauce, via une seconde verification du token. Sinon erreur, et si les caractères sont incorrecte, la sauce reviens a sont format avant modification. Si la sauce est modifier et que l'image ne l'est pas, aucun doublon, les informations sont mises à jour, si l'image est mise a jour, l'ancienne est supprimer avant la mise a jour, aucun doublon non plus. Toutes les informations sont donc mise a jour sur la base de données.
 * 
 * 08. SUPPRIMER SAUCE : La sauce est supprimer uniquement lors que la seconde authentification est confirmer via le token. Afin d'être sur que le propriétaire et bien le créateur de la sauce. Si c'est le cas, l'image est supprimer et la sauce aussi de la base de données.
 * 
 * 09. RECUPERER UNE SAUCE : Recupere une sauce via l'identifiant dans la requete, et compare a celle dans la base de données.
 * 
 * 10. RECUPERER TOUTES LES SAUCES : Recupere toutes les sauces de la base de données.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const Sauce         = require('../models/Sauce');             // - 01 -
const fs            = require('fs');                          // - 02 -
const jwt           = require('jsonwebtoken');                // - 03 -
const mongooseError = require('mongoose-error');              // - 04 -
/* ################################################ */



/* ############   CONTROLLERS   ################### */
exports.createSauce        = (request, response, next) => {   // - 05 -

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
            .catch(error => response.status(400).json({ error: '=> [ ' + error + ' ]' }));

    } else {

        // Suppression img si condition pas respecter
        const filename = request.file.filename;

        fs.unlink(`images/${filename}`,(error) => {

            if (error) { 
                throw error;
            };
            
        });

        mongooseError(
                
            response.status(403).json({ message : 'ERREUR : Les caractères sont obligatoires !'})
            
        );

    };

};
exports.likeOrDislikeSauce = (request, response, next) => {   // - 06 -

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
                 .catch(error => response.status(500).json({ error: '=> [ ' + error + ' ]' }));

        })
        .catch(error => response.status(401).json({ error : '=> [ ' + error + ' ]' }));

};
exports.modifySauce        = (request, response, next) => {   // - 07 -

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
                    .catch( error => response.status(400).json({ error: '=> [ ' + error + ' ]' }));

                // Suppression de la photo précédente avant => update    
                } else {

                    fs.unlink(`images/${filename}`, () => {
                        Sauce.updateOne({ _id: request.params.id }, { ...sauceObject, _id: request.params.id })
                        .then(() => response.status(200).json({ message: 'Sauce modifiée ! '}))
                        .catch( error => response.status(400).json({ error: '=> [ ' + error + ' ]' }));
                    });

                };
            
            // SINON ERREUR
            } else if (userId !== sauce.userId) {

                return response.status(403).json({ message : 'unauthorized request'});

            };

        })
        .catch( error => response.status(500).json({ error: '=> [ ' + error + ' ]' }));

    
    // si il met des espaces, et que le if n'est pas pas rempli, alors retour a la valeur d'origine déjà renseigner     
    } else {

        Sauce.findOne({ _id: request.params.id })
        .then(sauce => response.status(200).json(sauce))
        .catch(error => response.status(404).json({ error: '=> [ ' + error + ' ]' }));

    };

};
exports.deleteSauce        = (request, response, next) => {   // - 08 -

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
                    .catch(error => response.status(400).json({ error: '=> [ ' + error + ' ]' }));
                });
            
            // SINON ERREUR
            } else if (userId !== sauce.userId) {

                return response.status(403).json({ message : 'unauthorized request'});

            };
        
        })
        .catch( error => response.status(500).json({ error: '=> [ ' + error + ' ]' }));



};
exports.getOneSauce        = (request, response, next) => {   // - 09 -

    Sauce.findOne({ _id: request.params.id })
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({ error: '=> [ ' + error + ' ]' }));

};
exports.getAllSauce        = (request, response, next) => {   // - 10 -

    Sauce.find()
        .then(sauces => response.status(200).json(sauces))
        .catch(error => response.status(400).json({ error: '=> [ ' + error + ' ]' }));

};
/* ################################################ */