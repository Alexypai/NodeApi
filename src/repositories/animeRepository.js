const axios = require("axios");
const config = require("../../config/config");

const headers = {
    headers: {
        'Authorization': 'Bearer ' + config.animeApiAccessToken
    }
};
async function getAnimeDetails(params) {
    let animeId = [];
    let animeDetails = [];
    await axios.get('https://api.myanimelist.net/v2/anime?q=' + params + '&limit=1', headers)
        .then(response => {
            animeId = [];
            response.data.data.forEach(id => {
                animeId = [id.node.id];
            });
        })
        .catch(error => {
            return error;
        });

    animeDetails = await getDetails(animeId);

    if (animeDetails.length > 0) {
        const anime = JSON.parse(animeDetails)[0];
        animeDetails = [anime];

    }
    else {
        console.log("Aucun détail d'anime n'a été trouvé.");
    }

    return animeDetails;
}
async function getDetails(animeId) {
    try {
        const response = await axios.get(
            'https://api.myanimelist.net/v2/anime/' + animeId + '?fields=id,title,synopsis,start_date,num_episodes,mean',
            headers
        );

        const animeDetails = [response.data];

        return JSON.stringify(animeDetails, null, 2);
    } catch (error) {
        throw error;
    }
}


module.exports = { getAnimeDetails: getAnimeDetails } ;
