const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Contactez-nous Marine la plus forte !');
});

module.exports = router;
