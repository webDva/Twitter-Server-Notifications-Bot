# Twitter Server and Feedback Notification Bot

A Twitter bot for relaying server notifications and for relaying feedback when feedback forms are used.

# About

TODO

# Setup and installation

TODO

# How to use

TODO

# `./config.js` file internals

```javascript
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    PORT = 3000;

    CONSUMER_KEY = 'YOUR TWITTER APP CONSUMER KEY';
    CONSUMER_SECRET = 'YOUR TWITTER APP CONSUMER SECRETK KEY';
    ACCESS_TOKEN_KEY = 'YOUR TWITTER APP ACCESS TOKEN KEY';
    ACCESS_TOKEN_SECRET = 'YOUR TWITTER APP ACCESS TOKEN SECRET';
} else {
    PORT = process.env.PORT;

    CONSUMER_KEY = process.env.CONSUMER_KEY;
    CONSUMER_SECRET = process.env.CONSUMER_SECRET;
    ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
    ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
}

TWITTER_USERNAME = '@YOUR_TWITTER_USERNAME';
TWITTER_USERNAME_SPACED = TWITTER_USERNAME + ' ';

MAX_CHARS = 280;
```