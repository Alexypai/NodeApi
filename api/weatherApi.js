const axios = require("axios");
const moment = require("moment");

async function weatherApi(address, inputFormatedDate, today)  {

    let weatherTarget = null;
    await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
            appid: '16e409ca55174b0489510aa4f6a9e467',
            q: address,
        }
    })
        .then(response => {
            /* res.send(response.data.list);*/
            // Parcourir toutes les listes
            response.data.list.forEach(weatherList => {
                // Vérifier si la variable "dt_txt" contient la date recherchée
                const dateWeather = moment(weatherList.dt_txt).format('YYYY-MM-DD');
                if (dateWeather === inputFormatedDate) {
                    if(today === true){
                        weatherTarget = weatherList;
                        return weatherTarget
                    }else {
                        if ((moment(weatherList.dt_txt).format('LT') === "12:00")) {
                            weatherTarget = weatherList;
                            return weatherTarget
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
    return weatherTarget

}

module.exports = { weatherApi } ;