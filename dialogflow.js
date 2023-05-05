const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const axios = require("axios");
const moment = require('moment');


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
        if (result.action.includes("weather")){
            const dateDialogFlow = result.parameters.fields.date.stringValue;
            const address = result.parameters.fields.address.stringValue;
            if(dateDialogFlow.length > 0  && address.length > 0){
                let weatherTarget = null;
                const inputFormatedDate = moment(dateDialogFlow).format('YYYY-MM-DD')
                axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                    params: {
                        appid: '16e409ca55174b0489510aa4f6a9e467',
                        q: address,
                    }
                })
                    .then(response => {
                       /* res.send(response.data.list);*/
                        // Parcourir toutes les listes
                        response.data.list.forEach(weatherList => {
                            console.log(inputFormatedDate);
                                // Vérifier si la variable "dt_txt" contient la date recherchée
                                const dateWeather = moment(weatherList.dt_txt).format('YYYY-MM-DD');
                                console.log(dateWeather);
                                if (dateWeather === inputFormatedDate) {
                                    weatherTarget = weatherList;
                                }
                            return weatherTarget;
                        });
                        if(weatherTarget){
                            res.send(weatherTarget);
                        }else {
                            res.send("ERREUR DATE NON RETROUVER");
                        }                    })
                    .catch(error => {
                        console.log(error);
                        res.send(error.data);
                    });
            }else{
                res.send(result);
            }
        }else{
            res.send({ message: "No weather"});
        }
    });
}

module.exports = { handleChatRequest };
