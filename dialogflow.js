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
            const dateDialogFlow = result.parameters.fields.date["stringValue"];
            const address = result.parameters.fields.address["stringValue"];
            if(dateDialogFlow ===! ""  && address ===! ""){
                const inputFormatedDate = moment(dateDialogFlow).format('YYYY-MM-DD')
                axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                    params: {
                        appid: '16e409ca55174b0489510aa4f6a9e467',
                        q: 'paris',
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        res.send(response.data);

                        /*while (i <= response.data.list.length) {
                            response.data.list[i].find(item => {
                                const itemDate = moment(item.dt_txt);
                                if (itemDate.format('YYYY-MM-DD') === inputFormatedDate && itemDate.format('HH:mm:ss') === '12:00:00') {
                                    res.send(item.weather.main);
                                }
                            });
                        }*/
                    })
                    .catch(error => {
                        console.log(error);
                        res.send(error.data);
                    });
            }else{
                res.send({ message: date / address });
            }
        }else{
            res.send({ message: "No weather"});
        }
    });
}

module.exports = { handleChatRequest };
