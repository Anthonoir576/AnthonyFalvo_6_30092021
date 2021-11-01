
/* ##########   MES DECLARATIONS   ################ */

// package de hachage de mdp
const bcrypt = require('bcrypt');

// Importation de token et verification
const jwt = require('jsonwebtoken');                // 01. TOKEN
const User = require('../models/User');             // 02. Importation modèle de USER
const crypto = require('crypto-js');                // 03. Importation cryptos-JS

const environnement = require('dotenv');            // 04. Importation de la dépendance dotenv
environnement.config();
/* ################################################ */



/* ############   CONTROLLERS   ################### */
exports.signup = (request, response, next) => {      // 05. S'ENREGISTRER   

    const chiffrementMail = crypto.HmacSHA256(request.body.email, `${process.env.CRYPTO_KEY}`).toString();
    
    bcrypt.hash(request.body.password, 10)
        .then(hash => {
            const user = new User({
                email: chiffrementMail,
                password: hash
            });
            user.save()
                .then(() => response.status(201).json({ message: 'Utilisateur crée'}))
                .catch(error => response.status(400).json({ error }));
        })
        .catch(error => response.status(500).json({ error }));

};

exports.login = (request, response, next) => {       // 06. SE CONNECTER   

    const chiffrementMail = crypto.HmacSHA256(request.body.email, `${process.env.CRYPTO_KEY}`).toString();

    User.findOne({email: chiffrementMail})
    .then(user => {
        if(!user) {
            return response.status(401).json({ error: 'Utilisateur non trouvé '});
        }
        bcrypt.compare(request.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    response.status(401).json({ error: 'MDP incorrect '});
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
            .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error })); 

};
/* ################################################ */