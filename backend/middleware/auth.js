
/* ##########   MES DECLARATIONS   ################ */

const jwt = require('jsonwebtoken');


/* ################################################ */



/* ############   MIDDLEWARE    ################### */

module.exports = (request, response, next) => {

    try {

        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'KEY_TOKEN_SECRET');
        const userId = decodedToken.userId;

        if (request.body.userId && request.body.userId !== userId) {

            throw ' User ID non valable !';

        } else {

            next();

        }

    } catch (error) {

        response.status(401).json({ error: error | 'REquête non authentifiée'});

    }

};

/* ################################################ */