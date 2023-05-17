const {getAnimeDetails} = require("../../repositories/animeRepository");

async function getAnime(animeName, resultRequest) {
    let animeDetails = [];
    let resultResponse = resultRequest.fulfillmentText
    if (resultRequest.allRequiredParamsPresent) {
        animeDetails = await getAnimeDetails(animeName)
        if (animeDetails && animeDetails.length > 0) {
            const title = animeDetails[0].title;
            const start_date = animeDetails[0].start_date;
            const num_episodes = animeDetails[0].num_episodes;
            const mean = animeDetails[0].mean;
            const synopsis = animeDetails[0].synopsis;

            return formatAnimeDetails(title, start_date, num_episodes, mean, synopsis);
        }
    }
    else {
        return resultResponse;
    }
}

async function getAnimeGenre(animeName, resultRequest) {
    console.log('TEST');
}

function formatAnimeDetails(title, start_date, num_episodes, mean, synopsis) {
    return `
    <h3>${title}</h3>
    <h5>Date de sortie: ${start_date}</h5>
    <h5>Nombre d'épisodes: ${num_episodes}</h5>
    <h5>Note globale: ${mean}</h5>
    <h5>Résumé: ${synopsis}</h5>
  `;
}

module.exports = { getAnime, getAnimeGenre } ;