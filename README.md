# errortesti
node.js error screen test

## how to run
- make sure you have `node.js` installed
- run `npm -i`
- **if you have vscode** press F5 to run
- **if you don't have vscode** you can run `npm start` and also remove `.vscode` folder

## things about this project

**the app.js file has some debug things wich you can remove (lines 20-66)**

### how to give an error

to give an error screen to someone use (in app.get):

```javascript
returnError(res, req, "status code", "custom message");
```

### how to get error info

if you want to get error info use:

```javascript
let errorInfo = await getErrorInfo("status code");
```

### how to add error info

in `app/public/errors/errorInfo.json` is information about some status codes.

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

you want to add a new object and the name of that object is what you can use in `returnError()` and `getErrorInfo()`

the `statusCode` field needs to be an actual status code a list of them can be found in [wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

the `error` field needs to be a short description about the error wich you can find also in [wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

the `message` field needs to be a longer description about the error
