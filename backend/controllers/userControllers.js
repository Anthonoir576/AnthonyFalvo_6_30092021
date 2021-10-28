
/* ##########   MES DECLARATIONS   ################ */

// package de hachage de mdp
const bcrypt = require('bcrypt');

// Importation de token et verification
const jwt = require('jsonwebtoken');

// Importation modèle de USER depuis le fichier js
const User = require('../models/User');

// Importation cryptos-JS
const crypto = require('crypto-js');

// Importation de la dépendance dotenv
const environnement = require('dotenv');
environnement.config();

/* ################################################ */



/* ############   CONTROLLERS   ################### */
exports.signup = (request, response, next) => {

    const chiffrementMail = crypto.HmacSHA256(request.body.email, `${process.env.CRYPTO_KEY}`).toString();
    console.log(chiffrementMail);
    const test = crypto.HmacSHA256(chiffrementMail, `${process.env.CRYPTO_KEY}`);
    const mail = test.toString(crypto.enc.UTF-8);
    console.log(mail);


    bcrypt.hash(request.body.password, 10)
        .then(hash => {
            const user = new User({
                email: request.body.email,
                password: hash
            });
            user.save()
                .then(() => response.status(201).json({ message: 'Utilisateur crée'}))
                .catch(error => response.status(400).json({ error }));
        })
        .catch(error => response.status(500).json({ error }));

};

exports.login = (request, response, next) => {

   User.findOne({email: request.body.email})
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