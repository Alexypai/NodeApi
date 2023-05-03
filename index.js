const express = require('express');
const app = express();

// Route GET pour la page "contact"
app.get('/Marine', (req, res) => {
    res.send('Contactez-nous Marine la plus forte  !');
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});