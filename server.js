const express = require('express');
const bodyParser = require('body-parser');

const Twitter = require('twitter');

process.on('uncaughtException', (error) => {
    console.log('[❗⚠️🛑💢 Something happened with the bot!] ' + error);
    process.exit(1);
});

require('./config');

const app = express();

app.use(bodyParser.json()); // for using req.body

const client = new Twitter({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token_key: ACCESS_TOKEN_KEY,
    access_token_secret: ACCESS_TOKEN_SECRET
});

// For sending server or feedback notifications
// the sending server (or client) will send a notification JSON object that looks like this:
// const the_whole_body = { // the whole request body will be accepted
//     sender: 'baka game app',
//     type: '🔔 browser-side error',
//     message: 'something happened inside the browser game'
// };
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