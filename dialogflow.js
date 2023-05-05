const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const axios = require('axios');
const config = require('./config/config')
const {query} = require("express");

const projectId = 'my-project-1528825495569';
const sessionClient = new dialogflow.SessionsClient();

let animeList = [];

async function getAnimeList() {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + config.accessToken
        }
    };
    const response = await axios.get('https://api.myanimelist.net/v2/anime?q=One&limit=5', headers)
    .then(response => {
        response.data.data.forEach(anime => {
            animeList.push(anime.node);
        });
    })
    .catch(error => {
        return error;
    });
}
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

        await getAnimeList();

        res.send({message: animeList});
    });
}

module.exports = { handleChatRequest };
