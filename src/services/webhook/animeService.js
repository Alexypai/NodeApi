const config = require("../../../config/config");
const axios = require("axios");

let animeList = [];
async function getAnimeList() {
    // Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
    var query = '\
query ($id: Int) { # Define which variables will be used in the query (id)\
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)\
    id\
    title {\
      romaji\
      english\
      native\
    }\
  }\
}\
';

// Define our query variables and values that will be used in the query request
    var variables = {
        id: 15125
    };

// Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co';

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Make the HTTP Api request using Axios
    axios(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response) {
        console.log(response);
        return response.data;
    }

    function handleData(data) {
        animeList.push(data);
        console.log(data);
    }

    function handleError(error) {
        console.error('Error:', error.message);
    }
    // const headers = {
    //     headers: {
    //         'Authorization': 'Bearer ' + config.accessToken
    //     }
    // };
    //
    // let random = Math.floor(Math.random() * 42000) + 1;
    // console.log(random);
    //
    //     .then(response => {
    //         animeList = [];
    //         response.data.title.forEach(anime => {
    //             console.log(anime);
    //             animeList.push(anime);
    //         });
    //     })
    //     .catch(error => {
    //         return error;
    //     });
    //
    // return animeList;
}

module.exports = { getAnimeList } ;