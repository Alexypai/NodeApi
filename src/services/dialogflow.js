const dialogflow = require('@google-cloud/dialogflow');
const config = require('../../config/config')
const {getAnime, getAnimeGenre} = require("./webhook/animeService");
const {getWeatherResponse} = require("./webhook/weatherService");

const projectId = config.projectId;
const sessionClient = new dialogflow.SessionsClient();

async function handleChatRequest(req, res) {

    const sessionId = '227';
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    const message = req.body.message;

    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'fr-FR',
            },
        }
    };

    sessionClient.detectIntent(request).then(async (responses) => {
        const result = responses[0].queryResult;
        let chatBotResult = result.fulfillmentText;

        switch (true) {
            case (result.intent.displayName.includes("weather")):
                chatBotResult = await getWeatherResponse(result);
                break;
            case (result.intent.displayName.includes("get-anime")):
                chatBotResult = await getAnime(result.queryText, result);
                break;
            case (result.intent.displayName.includes("get-anime-details")):
                chatBotResult = await getAnimeGenre(result.queryText, result);
                break;
            case (result.intent.displayName === ""):
                chatBotResult = "Désolé, je n'ai compris ce que vous me demandé.\n Assurez-vous de me demander un contexte de météo ou d'animés"
                break;
        }


        res.send(chatBotResult);
    })
}

module.exports = { handleChatRequest };
