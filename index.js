const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./src/services/dialogflow');
const chatRoutes = require('./src/routes/chat');
const contactRoutes = require('./src/routes/contact');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/chat', chatRoutes);
app.use('/contact', contactRoutes);


app.listen(3000, () => {
    console.log('Serveur HTTPS en cours d\'exécution sur le port 3000.');
});