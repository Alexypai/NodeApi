const express = require('express');
const axios = require("axios");
const moment = require("moment");
const router = express.Router();

router.get('/', (req, res) => {
    axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
            appid: '16e409ca55174b0489510aa4f6a9e467',
            q: 'Paris',
        }
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
            res.send(error.data);
        });
/*
    res.send('Contactez-nous Marine la plus forte !');
*/
});

module.exports = router;
