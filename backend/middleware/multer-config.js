
/** ---- JS DOCUMENTATION MULTER-CONFIG.JS ----
 * 
 * 01. Importation de multer 
 * 
 * 02. Objet javaScript, permettant de récupéré le même type d'extension que celui de l'image selectionner. 
 * 
 * 03. Multer : la fonction diskStorage permet de préciser qu'on va l'enregistrer sur le disque en local. On prendra deux arguments. La destination, et le filename. La destination serra l'endroit ou l'on veut sauvegarder le fichier. On aura donc une fonction prenant en parametre la requete, le fichier, et un callback. Qui lui prend en parametre null (aucune erreur), ainsi que le nom du dossier. Ensuite filename, le deuxieme argument de diskStorage, determinera le nom de fichier a utiliser pour le fichier a enregistrer, avec comme paramètre la requete, le fichier, et le callback. on crée un objet MIME_TYPES, nous permetant d'attribuer une extension au fichier. On utilise file.mimetype, pour recuperer le type, on aura dans la console quelque chose comme image/jpg, en fonction du type d'extension. Le callback prendra aussi comme argument null, le nom du ficher que l'on veut attribuer, j'ai choisi un nombre le plus aléatoire possible + l'extension. 
 * 
 * 04. Exportation de multer, on utilise la fonction multer() comme parametre ce que l'on veut exporter, et la methode single pour dire qu'il s'agit d'un fichier unique, avec comme parametre le type de fichier ( donc image ).
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const multer     = require('multer');               // - 01 -
const MIME_TYPES = {                                // - 02 -

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'

};
/* ################################################ */



/* ##############   MIDDLEWARE   ################## */
const storage = multer.diskStorage({                // - 03 -

    destination: (request, file, callback) => {
        callback(null, 'images');
    },
    filename: (request, file, callback) => {

        const name = (Math.floor((Math.random() * 19423798) * Date.now()));
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + '.' + extension);

    }
});
/* ################################################ */



/* ##############   EXPORT   ###################### */
                                                    // - 04 -
module.exports = multer({storage: storage}).single('image');
/* ################################################ */