
/* ##########   MES DECLARATIONS   ################ */

const multer = require('multer');

const MIME_TYPES = {

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'

};

/* ################################################ */



/* ##############   MIDDLEWARE   ################## */

const storage = multer.diskStorage({

    destination: (request, file, callback) => {
        callback(null, 'images');
    },
    filename: (request, file, callback) => {

        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        
    }
});

/* ################################################ */



/* ##############   EXPORT   ###################### */

module.exports = multer({storage: storage}).single('image');

/* ################################################ */