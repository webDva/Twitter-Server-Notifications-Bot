# Twitter Server and Feedback Notification Bot

A Twitter bot for relaying server notifications and for relaying feedback when feedback forms are used.

# About

TODO

# Setup and installation

TODO

# How to use

TODO

# ./config.js file internals

```javascript
PORT = 3000;

CONSUMER_KEY = 'YOUR TWITTER CONSUMER KEY';
CONSUMER_SECRET = 'YOUR TWITTER CONSUMER SECRET';
ACCESS_TOKEN_KEY = 'YOUR TWITTER ACCESS TOKEN KEY';
ACCESS_TOKEN_SECRET = 'YOUR TWITTER ACCESS TOKEN SECRET';
```

# POST /notification API endpoint

It's for relaying server notifications or browser-side messages to a Twitter bot. The only parameter is a single JSON object. The JSON object can be anything and can look like this:

```javascript
{
    "sender": "web game #1",
    "type": "🔔 browser-side error",
    "message": error.message
}
```