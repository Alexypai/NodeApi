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
            'https://api.myanimelist.net/v2/anime/' + animeId + '?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics',
            headers
        );

        const animeDetails = [response.data];

        return JSON.stringify(animeDetails, null, 2);
    } catch (error) {
        throw error;
    }
}


module.exports = { getAnimeDetails: getAnimeDetails } ;
