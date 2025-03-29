const fs = require('fs');
const { getErrorInfo } = require('./src/errors');

let codes = null

fs.readFile("./app/other/errors/errorInfo.json", (err, data) => {
    if (err) {
        throw err;
    }

    codes = JSON.stringify(data);
});

test("test error info", async () => {
    for (const thing in Object.values(codes.statusCodes)) {
        expect(await getErrorInfo(thing)).toBe(codes.statusCodes[thing]);
    }
});