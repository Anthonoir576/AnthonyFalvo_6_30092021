
/** ---- JS DOCUMENTATION USERCONTROLLERS.JS ----
 * 
 * 01. Importation bcrypt (hashage mot de passe)
 * 
 * 02. Importation JWT pour le token, ainsi le configurer.
 * 
 * 03. Importation du modèle (schéma) utilisateur.
 * 
 * 04. Importation de crypto js afin de chiffrer l'adresse e-mail.
 * 
 * 05. Appel de la variable d'environnement .env ( ou .env.example), nous permettant de ne pas mélangé nos informations sensible, via un dépôt tel que github. Ainsi garder certain élément "confidentiel", tel que les données de connection mongoDB admin, les mots de passes, etc.. Voir .env.example pour en savoir plus.
 * 
 * 06. S'ENREGISTRER : Crypto chiffre l'adresse email. Bcrypt hash le mot de passe, et crée un nouvel utilisateur, avec les informations sécurisé avant la sauvegarde dans la base de données. 
 * 
 * 07. CE CONNECTER : L'email crypté est comparer a celui crypté dans la base de données, si l'utilisateur est présent, et que le mot de passe est valide, alors la connection s'effectue. Dans le cas ou l'email est introuvable => erreur, et si le mot de passe est incorrecte => erreur. Une fois ceci vérifié un token est crée pour l'utilisateur, avec une durée d'expiration de 24h.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const bcrypt        = require('bcrypt');            // - 01 -
const jwt           = require('jsonwebtoken');      // - 02 -
const User          = require('../models/User');    // - 03 -
const crypto        = require('crypto-js');         // - 04 -

const environnement = require('dotenv');            // - 05 -
environnement.config();
/* ################################################ */



/* ############   CONTROLLERS   ################### */
exports.signup = (request, response, next) => {     // - 06 -

    const chiffrementMail = crypto.HmacSHA256(request.body.email, `${process.env.CRYPTO_KEY}`).toString();
    
    bcrypt.hash(request.body.password, 10)
        .then(hash => {
            const user = new User({
                email: chiffrementMail,
                password: hash
            });
            user.save()
                .then(() => response.status(201).json({ message: 'Utilisateur crée'}))
                .catch(() => response.status(400).json({ message: 'ERREUR : Utilisateur déjà existant !'}));
        })
        .catch(error => response.status(500).json({ error: '=> [ ' + error + ' ]' }));

};
exports.login  = (request, response, next) => {     // - 07 -

    const chiffrementMail = crypto.HmacSHA256(request.body.email, `${process.env.CRYPTO_KEY}`).toString();

    User.findOne({email: chiffrementMail})
    .then(user => {
        if(!user) {
            
            return response.status(404).json({ message : 'Aucun compte via cette adresse e-mail !' })
 
        }
        bcrypt.compare(request.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    
                    return response.status(403).json({ message : 'Mot de passe incorrect !'});
                }
                response.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id},
                        `${process.env.TOKEN_KEY}`,
                        { expiresIn: '24h'}
                    )
                });
            })
            .catch(error => response.status(500).json({ error: '=> [ ' + error + ' ]' }));
    })
    .catch(error => response.status(500).json({ error: '=> [ ' + error + ' ]' })); 

};
/* ################################################ */