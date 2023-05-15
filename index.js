const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./src/services/dialogflow');
const chatRoutes = require('./src/routes/chat');
const contactRoutes = require('./src/routes/contact');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/chat', chatRoutes);
app.use('/contact', contactRoutes);

// Configuration HTTPS
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
};

const server = https.createServer(sslOptions, app);

server.listen(3000, () => {
    console.log('Serveur HTTPS en cours d\'exécution sur le port 3000.');
});