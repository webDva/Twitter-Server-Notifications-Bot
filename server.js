const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for using req.body

const PORT = process.env.PORT || '3000';
app.set('port', PORT);

// error handling route
app.use(function (err, req, res, next) {
    console.log("[ERROR] " + err);
    return res.send({ success: false });
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('[UNEXPECTED MISTAKE] Something bad happened: ', err);
    }

    console.log(`Twitter Server and Feedback Notification Bot running on port ${PORT}.`);
});