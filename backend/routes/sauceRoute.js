
/* ##########   MES DECLARATIONS   ################ */

const express = require('express');
const router = express.Router();

// Importation des controllers SAUCE => logique de routing
const sauceCtrl = require('../controllers/sauceControllers');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

/* ################################################ */



/* ##############   MES ROUTES   ################## */

// Route => logique route dans sauceControllers.js
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);

/* ################################################ */



/* ##############    EXPORT     ################### */

// exportation de la const router pour la recuperer sur nimporte quel fichier
module.exports = router;

/* ################################################ */
