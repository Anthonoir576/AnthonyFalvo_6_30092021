
/* ##########   MES DECLARATIONS   ################ */

// const http qui permet l'accès a l'objet http et créer un serveur
const http = require('http');

// importation de app depuis app.js
const app = require('./app');

// Importation de la dépendance dotenv
const environnement = require('dotenv');
environnement.config();

/* ################################################ */





/* ################  SERVEUR  ##################### */

// indication a express sur quel port tourner
app.set('port', process.env.PORT || 3000);

// creatServer fait partie du package de http
const server = http.createServer(app);

// Si l'environnement sur lequel tourne le serveur envoie un port a utilisé, ou sinon par defaut le port 3000
server.listen(process.env.PORT || 3000);

/* ################################################ */
