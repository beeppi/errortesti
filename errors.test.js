const fs = require('fs');
const { returnError } = require('./src/errors');

let codes = null

fs.readFile("./app/public/errors/errorInfo.json", (err, data) => {
    if (err) {
        throw err;
    }

    codes = JSON.stringify(data);
});

for (const value in Object.values(codes.StatusCodes)) {
    returnError(undefined, undefined, value, "test");
}