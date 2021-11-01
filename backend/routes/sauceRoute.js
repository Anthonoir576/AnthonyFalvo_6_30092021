
/** ---- JS DOCUMENTATION SAUCEROUTE.JS ----
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
const express   = require('express');                         // 01. Import Express
const router    = express.Router();                           // 02. Router CONFIG

const sauceCtrl = require('../controllers/sauceControllers'); // 03. Controllers
const auth      = require('../middleware/auth');              // 04. Auth TOKEN  
const multer    = require('../middleware/multer-config');     // 05. Import multer
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                              // 06. Route SAUCE
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                      // 07. EXPORT
/* ################################################ */
