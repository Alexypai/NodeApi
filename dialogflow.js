const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const config = require('../../config/config')
const {getAnimeList} = require("./webhook/animeService");
const {getWeatherResponse} = require("./webhook/weatherService");

const projectId = config.projectId;
const sessionClient = new dialogflow.SessionsClient();

async function handleChatRequest(req, res) {

    const sessionId = "sessionChatBot69";
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
        let chatBotResult = null;
        console.log(result.intent.displayName)
        switch (true) {
            case (result.intent.displayName.includes("weather")):
                chatBotResult = await getWeatherResponse(result);
                break;
            case (result.intent.displayName.includes("anime")):
                chatBotResult = await getAnimeList();
                break;
            case (result.intent.displayName === ""):
                chatBotResult = "Désolé, je n'ai compris ce que vous me demandé.\n Assurez-vous de me demander un contexte de météo ou d'animés"
                break;
        }
        console.log(chatBotResult)
        res.send(chatBotResult);
    });
}

module.exports = { handleChatRequest };



