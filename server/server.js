// includes
let express = require('express');
let bodyParser = require('body-parser');
let recordRouter = require('./routers/record.router');

let app = express();

// globals
let port = process.env.PORT || 5000;

// uses
app.use(express.static('server/public'));
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use(bodyParser.json());

// router
app.use( '/record', recordRouter);

// connect to mongo db
const mongoose = require('mongoose');
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

app.listen(port, () => console.log(`Listening on port ${port}...`));