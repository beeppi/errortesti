import { readFile } from 'fs';
import { returnError } from './src/errors';

let codes = null

readFile("./app/public/errors/errorInfo.json", (err, data) => {
    if (err) {
        throw err;
    }

    codes = JSON.stringify(data);
});

for (const value in Object.values(codes.StatusCodes)) {
    returnError(undefined, undefined, value, "test");
}