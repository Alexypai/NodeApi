const config = require("../../../config/config");
const axios = require("axios");

let animeList = [];
async function getAnimeList() {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + config.accessToken
        }
    };
    await axios.get('https://api.myanimelist.net/v2/anime?q=One&limit=5', headers)
        .then(response => {
            response.data.data.forEach(anime => {
                animeList.push(anime.node);
            });
        })
        .catch(error => {
            return error;
        });

    return animeList;
}

module.exports = { getAnimeList } ;