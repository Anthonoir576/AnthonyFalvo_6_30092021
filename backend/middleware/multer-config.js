
/** ---- JS DOCUMENTATION MULTER-CONFIG.JS ----
 * 
 * 01. 
 * 
 * 02.  
 * 
 * 03.
 * 
 * 04.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const multer     = require('multer');               // 01. Import multer
const MIME_TYPES = {                                // 02. JSON Objet

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'

};
/* ################################################ */



/* ##############   MIDDLEWARE   ################## */
const storage = multer.diskStorage({                // 03. Multer config

    destination: (request, file, callback) => {
        callback(null, 'images');
    },
    filename: (request, file, callback) => {

        const extension = MIME_TYPES[file.mimetype];
        callback(null, (Math.floor((Math.random() * 19423798) * Date.now())) + '.' + extension);

    }
});
/* ################################################ */



/* ##############   EXPORT   ###################### */
                                                    // 04. EXPORT
module.exports = multer({storage: storage}).single('image');
/* ################################################ */