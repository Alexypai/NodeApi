const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const axios = require('axios');
const config = require('../../config/config')
const {query} = require("express");
const {getAnimeList} = require("./webhook/animeService");

const projectId = config.projectId;
const sessionClient = new dialogflow.SessionsClient();

async function handleChatRequest(req, res) {

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

    sessionClient.detectIntent(request).then(async (responses) => {
        const result = responses[0].queryResult;
        // console.log(result);

        const animeList = await getAnimeList();
        console.log(animeList);

        result.fulfillmentText = `Voici une liste d'animes à regarder : `;
        res.send({message: result.fulfillmentText});
    });
}

module.exports = { handleChatRequest };
