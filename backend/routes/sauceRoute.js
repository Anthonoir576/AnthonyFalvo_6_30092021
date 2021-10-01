
/* ##########   MES DECLARATIONS   ################ */

const express = require('express');
const router = express.Router();

// Importation des controllers SAUCE => logique de routing
const sauceCtrl = require('../controllers/sauceControllers');

/* ################################################ */

/*                    *******                       */

/* ##############   MES ROUTES   ################## */

/* !!!!!  VERIFIER SI LE USERID EST DEDANS AU TEST !!!!!!!!!! */
// Route => logique route dans sauceControllers.js
router.post('/', sauceCtrl.createSauce);
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.get('/', sauceCtrl.getAllSauce);

/* ################################################ */

/*                    *******                       */

/* ##############    EXPORT     ################### */

// exportation de la const router pour la recuperer sur nimporte quel fichier
module.exports = router;

/* ################################################ */
