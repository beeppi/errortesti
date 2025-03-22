const http = require('http');
const express = require('express');
const { returnError } = require('./src/errors');

let app = express();


app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/app/public'));

require("./src/debug")(app); // you can remove this

app.get('/', (req, res) => {
    res.render('index');
    // returnError(res, req, "418", "Happy april fools! (actual status code btw, added april 1st 1998)"); // for april fools
});

app.get('*', (req, res) => {
    returnError(res, req, "404", "couldn't find " + req.url);
});


http.createServer(app).listen(app.get('port'), () => {
    console.log('server running on port ' + app.get('port'));
});
