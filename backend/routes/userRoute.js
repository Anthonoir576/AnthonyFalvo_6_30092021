
/* ##########   MES DECLARATIONS   ################ */
const express = require('express');                         // 01.
const router  = express.Router();                           // 02. 

const password = require('../middleware/password');         // 03. Controle password     
const userCtrl = require('../controllers/userControllers'); // 04. Importation des controllers
/* ################################################ */



/* ############   CONTROLLERS   ################### */
                                                            // 05.
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
/* ################################################ */




/* ##############    EXPORT     ################### */
module.exports = router;                                    // 06. 
/* ################################################ */
