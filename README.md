# errortesti

error screen test

[![License](https://img.shields.io/github/license/beeppi/errortesti)](./LICENSE)
[![tests](https://github.com/beeppi/errortesti/actions/workflows/node.js.yml/badge.svg)](https://github.com/beeppi/errortesti/actions/workflows/node.js.yml)

## contents
- [some stuff](#some-stuff)
- [how to run](#how-to-run)
- [about this project](#things-about-this-project)
    - [how to give an error](#how-to-give-an-error)
    - [how to get error info](#how-to-get-error-info)
    - [how to add error info](#how-to-add-error-info)

## some stuff

coded with:

[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.oracle.com/ar/javascript/)
[![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)](https://ejs.co/)

made using:

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)

## how to run

required to run:

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://docs.npmjs.com/cli/v8/commands/npm-install)

> [!TIP]
> 
> you can install NPM with nodeJS

- install project
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
