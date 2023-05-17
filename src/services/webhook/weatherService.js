const moment = require("moment");
const {weatherApi} = require("../../repositories/weatherRepository");
require('moment/locale/fr'); // Importer la localisation française


async function getWeatherResponse(result) {
    let aswerUserWeather = false;
    let today = false;
    let closedAsk = null;
    const actualDate = moment(new Date()).format('YYYY-MM-DD')
    if(result.allRequiredParamsPresent === true) {
        const askfield = result.parameters.fields;
        const dateDialogFlow = result.parameters.fields.date.stringValue;
        const address = result.parameters.fields.address.stringValue;
        if("weather" in askfield){
            closedAsk = askfield.weather.stringValue
        }
        if (dateDialogFlow.length > 0 && address.length > 0) {
            const inputFormatedDate = moment(dateDialogFlow).format('YYYY-MM-DD')
            if(moment(actualDate).format('YYYY-MM-DD') === inputFormatedDate){
                today = true
            }

            const weatherTarget = await weatherApi(address, inputFormatedDate, today);
                    if (weatherTarget) {
                        const weatherId = weatherTarget.weather[0].id;
                        const tempKelvin = weatherTarget.main.temp;
                        const tempCelsius = Math.floor(tempKelvin - 273.15);
                        let weatherInfoFr = null;
                        switch (true) {
                            case (weatherId >= 200 && weatherId <= 299):
                                weatherInfoFr = "orageux"
                                if(closedAsk === "orage"){
                                    aswerUserWeather = true;
                                }
                                break;
                            case (weatherId >= 300 && weatherId <= 399):
                                weatherInfoFr = "brumeux"
                                if(closedAsk === "brume"){
                                    aswerUserWeather = true;
                                }
                                break;
                            case (weatherId >= 500 && weatherId <= 599):
                                weatherInfoFr = "pluvieux"
                                if(closedAsk === "pluie"){
                                    aswerUserWeather = true;
                                }
                                break;
                            case (weatherId >= 600 && weatherId <= 699):
                                weatherInfoFr = "neigeux"
                                if(closedAsk === "neige"){
                                    aswerUserWeather = true;
                                }
                                break;
                            case (weatherId >= 700 && weatherId <= 799):
                                weatherInfoFr = "dangeureux ! Veuillez évité la zone"
                                break;
                            case (weatherId === 800):
                                weatherInfoFr = "claire"
                                if(closedAsk === "soleil"){
                                    aswerUserWeather = true;
                                }
                                break;
                            case (weatherId >= 801 && weatherId <= 810):
                                weatherInfoFr = "nuageux"
                                if(closedAsk === "nuage"){
                                    aswerUserWeather = true;
                                }
                                break;
                        }


                        if(today === true){
                            return "Le temps aujourd'hui est " + weatherInfoFr + " avec une température de " + tempCelsius + "°C à " + address;

                        }else{
                            return "Le " + moment(dateDialogFlow).format('LL') + ", le temps sera " + weatherInfoFr + " avec une température de " + tempCelsius + "°C à " + address;
                        }
                    } else {
                        return "Désolé, nous n'avons pas assez d'argent pour vous fournir la méteo au dela de 5 jours..."
                    }

        } else {
            return result
        }
    }else{
        return result.fulfillmentText;
    }
}

module.exports = { getWeatherResponse } ;