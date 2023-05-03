// Import Express framework.
const express = require('express');
const app = express();
// Import the Storage library.
const {Storage} = require('@google-cloud/storage');
// Import the Dialogflow library.
const dialogflow = require('@google-cloud/dialogflow');

/** Params projet.*/
const projectId = 'newagent-cmnu';

/** Params requête. */
const sessionId = '123456';
const queries = [
'Reserve a meeting room in Toronto office, there will be 5 of us',
'Next monday at 3pm for 1 hour, please',
'B'
 ]
const languageCode = 'fr';


// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();

// Route GET pour la page "contact"
app.get('/Marine', (req, res) => {
    res.send('Contactez-nous Marine la plus forte  !');
});
// Route GET pour la page "contact"
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});



/** Authentification.*/

async function authenticateImplicitWithAdc() {
  // This snippet demonstrates how to list buckets.
  // NOTE: Replace the client created below with the client required for your application.
  // Note that the credentials are not specified when constructing the client.
  // The client library finds your credentials using ADC.
  const storage = new Storage({
    projectId,
  });
  const [buckets] = await storage.getBuckets();
  console.log('Buckets:');

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log('Listed all storage buckets.');
}

authenticateImplicitWithAdc();


/** Query.*/



async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
  // Keeping the context across queries let's us simulate an ongoing conversation with the bot
  let context;
  let intentResponse;
  for (const query of queries) {
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      console.log('Detected intent');
      console.log(
        `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
      );
      // Use the context from this response for next queries
      context = intentResponse.queryResult.outputContexts;
    } catch (error) {
      console.log(error);
    }
  }
}
executeQueries(projectId, sessionId, queries, languageCode);