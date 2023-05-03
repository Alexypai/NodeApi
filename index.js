const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

// Configuration de body-parser pour les requêtes POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration de l'API Dialogflow
const projectId = 'newagent-cmnu'; // Votre identifiant de projet Dialogflow
const sessionId = uuid.v4();
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

// Route pour le tchat
app.post('/chat', async (req, res) => {
    // Obtention du message de l'utilisateur depuis la requête
    const message = req.body.message;

    // Création de la requête de session Dialogflow
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'fr-FR',
            },
        },
    };

    // Envoi de la requête à Dialogflow
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    // Renvoi de la réponse de Dialogflow à l'utilisateur
    res.send({ message: result.fulfillmentText });
});
// Route GET pour la page "contact"
app.get('/Marine', (req, res) => {
    res.send('Contactez-nous Marine la plus forte  !');
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});