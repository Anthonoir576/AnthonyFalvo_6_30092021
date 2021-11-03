
/** ---- JS DOCUMENTATION USERROUTE.JS ----
 * 
 * 01. Importation d'Express
 * 
 * 02. express.Router permet de créer des gestionnaires de route modulaires il définit des routes et monte le module de routeur sur un chemin dans l’app principale.
 * 
 * 03. Importation du controle password (limite de caractère)
 * 
 * 04. Importation du contrôle email via regexp.
 * 
 * 05. Importation controllers (ligique metier des utilisateurs [ Enregistrement, Connexion])
 * 
 * 06. Les différentes route utilisateur.
 * 
 * 07. Export router
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express  = require('express');                        // - 01 -
const router   = express.Router();                          // - 02 -
const password = require('../middleware/password');         // - 03 - 
const mail     = require('../middleware/email');            // - 04 -
const userCtrl = require('../controllers/userControllers'); // - 05 -
/* ################################################ */



/* ############   CONTROLLERS   ################### */
                                                            // - 06 -
router.post('/signup', mail, password, userCtrl.signup);
router.post('/login', userCtrl.login);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                    // - 07 -
/* ################################################ */