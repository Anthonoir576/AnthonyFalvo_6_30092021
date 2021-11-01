
/** ---- JS DOCUMENTATION USERCONTROLLERS.JS ----
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
 */



/* ##########   MES DECLARATIONS   ################ */
const bcrypt        = require('bcrypt');            // 01.
const jwt           = require('jsonwebtoken');      // 02.
const User          = require('../models/User');    // 03.
const crypto        = require('crypto-js');         // 04.

const environnement = require('dotenv');            // 05.
environnement.config();
/* ################################################ */



/* ############   CONTROLLERS   ################### */
exports.signup = (request, response, next) => {      // 06.

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
exports.login  = (request, response, next) => {      // 07.

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