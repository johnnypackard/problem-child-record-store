const express = require('express');

const app = express();

app.use(express.static('server/public'));

// connect to mongo db
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use(bodyParser.json());

const DATABASE_NAME = 'library';
const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
mongoose.connect(DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected to ${DATABASE_URL}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongoose connection error: ${error}`);
});
// --- END of Mongo Connection Stuff

const recordRouter = require('./routers/record.router');
app.use( '/record', recordRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));