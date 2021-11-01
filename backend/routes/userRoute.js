
/** ---- JS DOCUMENTATION USERROUTE.JS ----
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
 */



/* ##########   MES DECLARATIONS   ################ */
const express = require('express');                         // 01. Import Express
const router  = express.Router();                           // 02. Router CONFIG

const password = require('../middleware/password');         // 03. Import password     
const userCtrl = require('../controllers/userControllers'); // 04. Import userCtrl
/* ################################################ */



/* ############   CONTROLLERS   ################### */
                                                            // 05. Route USER
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
/* ################################################ */




/* ##############    EXPORT     ################### */
module.exports = router;                                    // 06. EXPORT
/* ################################################ */
