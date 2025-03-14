var http = require('http');
var express = require('express');
var fs = require('fs');

var app = express();

let archivenum = 0;

fs.rm("./app/other/errorArchive", { recursive: true, force: true }, (err) => {
    if (err) {
        console.log(err);
    }
})

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/app/public'));

app.get('/', (req, res) => {
    res.render('index');
    // returnError(res, req, 418, "Happy april fools! (actual status code btw, added april 1st 1998)"); // for april fools
});

app.get('/vie', (req, res) => {
    res.redirect('/');
});

app.get("/500test", (req, res) => {
    returnError(res, req, 1234, "moi"); // tarkotuksella 1234
})

app.get("/test", (req, res) => {
    throw new Error("TEST");
});

app.get("/debug/errorInfo", async (req, res) => {
    if (!req.query.statusCode) {
        returnError(res, req, 400, "parameter statusCode required");
        return ;
    }

    let info = await getErrorInfo(req.query.statusCode);

    if (info.statusCode == 500 && req.query.statusCode != 500) {
        res.status(500);
        returnError(res, req, 500, info.customMessage);
        return ;
    }

    res.json(info);
});

app.get("/debug/errorInfoGUI", async (req, res) => {
    if (!req.query.statusCode) {
        returnError(res, req, 400, "query parameter statusCode required");
        return ;
    }

    let info = await getErrorInfo(req.query.statusCode);

    if (info.statusCode == 500 && req.query.statusCode != 500) {
        res.status(500);
    }

    res.render("errorPage", info);
})

app.get('*', (req, res) => {
    returnError(res, req, 404, "couldn't find " + req.url);
});


async function returnError(res, req, statusCode, customMessage) {
    let errorInfo = await getErrorInfo(statusCode);
    
    if (errorInfo.customMessage == null) {
        errorInfo.customMessage = customMessage;
    }

    console.log("new error happened: " + errorInfo.statusCode);

    uploadToArchive(req, statusCode, customMessage);
    
    res.status(errorInfo.statusCode);
    res.render("errorPage", errorInfo);
}

function uploadToArchive(req, statusCode, customMessage) {

    const updateData = {
        statusCode: statusCode,
        customMessage: customMessage,
        url: req.url
    }

    jsonDat = JSON.stringify(updateData);
    jsonData = JSON.parse(jsonDat);

    let dir = "./app/other/errorArchive"

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }

    fs.writeFile(dir + "/error" + archivenum + ".json", JSON.stringify(updateData), (err) => {
        if (err) {
            console.error(err);
          }
    });

    archivenum++
}

async function getErrorInfo(error) {
    let joku = fs.readFileSync("./app/public/errors/errorInfo.json");

    let asd = await JSON.parse(joku);
    let asdasd = await asd.statusCodes[error];

    if (!asdasd) {
        let problem = asd.statusCodes[500];
        problem.customMessage = "couldn't find information about status code " + error;
        return problem;
    }

    return asdasd;
}

http.createServer(app).listen(app.get('port'), () => {
    console.log('server running on port ' + app.get('port'));
});