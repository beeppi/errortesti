# errortesti
node.js error screen test

## how to run
- make sure you have `node.js` installed
- run `npm -i`
- **if you have vscode** press F5 to run
- **if you don't have vscode** you can run `npm start` and also remove `.vscode` folder

**the app.js file has some debug things wich you can remove (lines 20-66)**

to give an error screen to someone use:
```javascript
returnError(res, req, "status code", "custom message");
```