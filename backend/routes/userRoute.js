
/* ##########   MES DECLARATIONS   ################ */
const express = require('express');
const router = express.Router();

// Importation des controllers USER => logique de routing
const userCtrl = require('../controllers/userControllers');
/* ################################################ */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

/* ##############    EXPORT     ################### */
module.exports = router;
/* ################################################ */
