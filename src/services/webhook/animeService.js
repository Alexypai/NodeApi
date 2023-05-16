const config = require("../../../config/config");
const axios = require("axios");

const headers = {
    headers: {
        'Authorization': 'Bearer ' + config.accessToken
    }
};

let animeId = [];
let animeDetails = [];
async function getAnime(animeName) {
    await axios.get('https://api.myanimelist.net/v2/anime?q=' + animeName + '&limit=1', headers)
        .then(response => {
            animeId = [];
            response.data.data.forEach(id => {
                animeId.push(id.node.id);
            });
        })
        .catch(error => {
            return error;
        });
    console.log(animeId);
    animeDetails = await getAnimeDetails(animeId);

    return animeDetails;
}
async function getAnimeDetails(animeId) {
    try {
        const response = await axios.get('https://api.myanimelist.net/v2/anime/' + animeId + '?fields=id,title,synopsis', headers);
        const animeDetails = [response.data]; // Récupérer les données de réponse dans animeDetails
        console.log(animeDetails);
        const jsonString = JSON.stringify(animeDetails, null, 2); // Formater avec une indentation de 2 espaces
        console.log(jsonString);
        return jsonString;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { getAnime } ;