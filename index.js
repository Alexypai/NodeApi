const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('./dialogflow');
const chatRoutes = require('./routes/chat');
const contactRoutes = require('./routes/contact');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/chat', chatRoutes);
app.use('/contact', contactRoutes);

app.listen(3000, () => {
    console.log('App listening on port 3000');
});