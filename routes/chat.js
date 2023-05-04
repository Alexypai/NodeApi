const express = require('express');
const router = express.Router();
const dialogflow = require('../dialogflow');

router.post('/', dialogflow.handleChatRequest);

module.exports = router;
