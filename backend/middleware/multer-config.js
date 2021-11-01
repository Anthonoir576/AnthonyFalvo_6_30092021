
/* ##########   MES DECLARATIONS   ################ */
const multer     = require('multer');               // 01.
const MIME_TYPES = {                                // 02. 

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'

};
/* ################################################ */



/* ##############   MIDDLEWARE   ################## */
const storage = multer.diskStorage({                // 03.

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
                                                    // 04.
module.exports = multer({storage: storage}).single('image');
/* ################################################ */