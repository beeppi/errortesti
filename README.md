# errortesti
node.js error screen test

## contents
- [how to run](#how-to-run)
- [about this project](#things-about-this-project)
    - [how to give an error](#how-to-give-an-error)
    - [how to get error info](#how-to-get-error-info)
    - [how to add error info](#how-to-add-error-info)

## how to run
- make sure you have `node.js` installed
- run `npm i`
- **if you have vscode** press F5 to run
- **if you don't have vscode** you can run `npm start`. You can also remove the `.vscode` folder

## things about this project

**the index.js file has a debug import wich you can remove (ln. 13)**

### how to give an error

to give an error screen to someone you can use the `returnError()` funktion

here's how it works

```javascript
returnError(req, res, "status code", "custom message");
```

you can use it in index.js like this:

```javascript
const express = require('express');
const { returnError } = require('./src/errors.js');

let app = express();

app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'ejs'); // ejs required, use `npm i ejs` if you don't have it
app.use(express.static(__dirname + '/app/public'));

app.get("/", (req, res) => {
    returnError(req, res, "404", "example");
});
```

### how to get error info

if you want to get error info use the `getErrorInfo()` funktion

here's how it works:

```javascript
// use await or it will not work
await getErrorInfo("status code");
```

you can use it in index.js like this:

```javascript
const express = require('express');
const { getErrorInfo } = require('./src/errors.js');

let app = express();

app.use(express.static(__dirname + '/app/public'));

app.get("/", async (req, res) => {
    errorInfo = await getErrorInfo("404");
});
```

### how to add error info

in `./app/public/errors/errorInfo.json` is information about some status codes.

if you want to use more status codes you can do it like this:

heres an example for 404

```json
{
    "404": {
        "statusCode": 404,
        "error": "not found",
        "message": "we did not find the page you were looking for"
    }
}
```

here is an explanation on what the thing means:

- `statusCode`: needs to be an actual status code a list of them can be found in [wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

- `error`: needs to be a short description about the error wich you can find also in [wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

- `message`: needs to be a longer description about the error

- if you add a new object the name of that object is what you can use in `returnError()` and `getErrorInfo()`

currently there are these status codes:
- 404 (not found)
- 400 (bad request)
- 500 (internal server error)
- 418 (i'm a teapot)
