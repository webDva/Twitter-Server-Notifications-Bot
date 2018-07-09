const express = require('express');
const bodyParser = require('body-parser');

const Twitter = require('twitter');

process.on('uncaughtException', (error) => {
    console.log('[❗⚠️🛑💢 Something happened with the bot!] ' + error);
    process.exit(1);
});

if (!process.env.NODE_ENV) {
    require('./config');
} else {
    PORT = process.env.PORT;

    CONSUMER_KEY = process.env.CONSUMER_KEY;
    CONSUMER_SECRET = process.env.CONSUMER_SECRET;
    ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
    ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

    TWITTER_USERNAME = process.env.TWITTER_USERNAME;
}

TWITTER_USERNAME_SPACED = TWITTER_USERNAME + ' ';
MAX_CHARS = 280;

const app = express();

app.use(bodyParser.json()); // for using req.body

const client = new Twitter({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token_key: ACCESS_TOKEN_KEY,
    access_token_secret: ACCESS_TOKEN_SECRET
});

// For sending server or feedback notifications
app.post('/notification', (req, res) => {
    client.post('statuses/update', { status: (TWITTER_USERNAME_SPACED + JSON.stringify(req.body, null, ' ')).substring(0, MAX_CHARS - TWITTER_USERNAME_SPACED.length) }, (error, tweet, response) => {
        if (error) {
            // a free heroku account will put up to about 100 console messages into a logging mechanism that you can still access
            console.log('[❌ Failed to post tweet] ' + JSON.stringify({ 'Twitter error': error, notification: req.body }, null, ' '));
            return res.send({ success: false });
        } else {
            console.log('[✉️ Server notification sent] ' + JSON.stringify({ notification: req.body }, null, ' '));
            return res.send({ success: true });
        }
    });
});

// uncaught API error handling route
app.use(function (error, req, res, next) {
    console.log('[❌ API error] ' + error);
    return res.send({ success: false });
});

app.set('port', PORT);

app.listen(PORT, (error) => {
    if (error) {
        return console.log('[❗ Something unexpected happened when starting up] ', error);
    }

    console.log('[🤖 Twitter Server and Feedback Notification Bot] has been started up 🆙');
});