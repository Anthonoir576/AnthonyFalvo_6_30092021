
/* ##########   MES DECLARATIONS   ################ */

// package de hachage de mdp
const bcrypt = require('bcrypt');

// Importation de token et verification
const jwt = require('jsonwebtoken');

// importation modèle de SAUCE depuis le fichier js
const User = require('../models/User');

/* ################################################ */

/* ############   CONTROLLERS   ################### */
exports.signup = (request, response, next) => {

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
                        'KEY_TOKEN_SECRET',
                        { expiresIn: '24h'}
                    )
                });
            })
            .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error })); 

};
/* ################################################ */