
/* ##########   MES DECLARATIONS   ################ */
const express = require('express');
const router = express.Router();

// Controle password
const password = require('../middleware/password');

// Importation des controllers USER => logique de routing
const userCtrl = require('../controllers/userControllers');
/* ################################################ */



/* ############   CONTROLLERS   ################### */

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

/* ################################################ */




/* ##############    EXPORT     ################### */
module.exports = router;
/* ################################################ */
