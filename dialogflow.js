const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const projectId = 'ipiagent1-anpv';
const sessionClient = new dialogflow.SessionsClient();

function handleChatRequest(req, res) {
    const sessionId = uuid.v4();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    const message = req.body.message;

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'fr-FR',
            },
        },
    };

    sessionClient.detectIntent(request).then((responses) => {
        const result = responses[0].queryResult;
        res.send({ message: result.fulfillmentText });
    });
}

module.exports = { handleChatRequest };
