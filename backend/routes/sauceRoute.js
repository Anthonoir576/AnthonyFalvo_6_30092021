
/* ##########   MES DECLARATIONS   ################ */

const { request } = require('express');
const express = require('express');
const router = express.Router();

// Importation des controllers SAUCE => logique de routing
const sauceCtrl = require('../controllers/sauceControllers');

const auth = require('../middleware/auth');

/* ################################################ */



/* ##############   MES ROUTES   ################## */

/* !!!!!  VERIFIER SI LE USERID EST DEDANS AU TEST !!!!!!!!!! */
// Route => logique route dans sauceControllers.js
router.post('/', auth, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);

/* ################################################ */



/* ##############    EXPORT     ################### */

// exportation de la const router pour la recuperer sur nimporte quel fichier
module.exports = router;

/* ################################################ */
