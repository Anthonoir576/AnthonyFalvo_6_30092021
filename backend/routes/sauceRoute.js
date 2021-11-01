
/* ##########   MES DECLARATIONS   ################ */

const express = require('express');                           // 01.
const router  = express.Router();                             // 02.

const sauceCtrl = require('../controllers/sauceControllers'); // 03.
const auth      = require('../middleware/auth');              // 04.   
const multer    = require('../middleware/multer-config');     // 05.

/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                              // 06.
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
/* ################################################ */



/* ##############    EXPORT     ################### */


module.exports = router;                                      // 07. 

/* ################################################ */
