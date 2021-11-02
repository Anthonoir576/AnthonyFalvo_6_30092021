
/** ---- JS DOCUMENTATION SAUCEROUTE.JS ----
 * 
 * 01. Importation express
 * 
 * 02. express.Router permet de créer des gestionnaires de route modulaires il définit des routes et monte le module de routeur sur un chemin dans l’app principale.
 * 
 * 03. Importation controllers (logique metier des sauces)
 * 
 * 04. Importation authentification via token
 * 
 * 05. Importation de multer-config afin de stocker les images dans le dossier /images/
 * 
 * 06. Les différentes route sauce. 
 * 
 * 07. Export router
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                         // - 01 -
const router    = express.Router();                           // - 02 -
const sauceCtrl = require('../controllers/sauceControllers'); // - 03 -
const auth      = require('../middleware/auth');              // - 04 -
const multer    = require('../middleware/multer-config');     // - 05 -
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                              // - 06 -
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                      // - 07 -
/* ################################################ */
