const fs = require('fs');
const { getErrorInfo } = require('../errors');
const codes = require("../errors/errorInfo.json")


test("test error info", async () => {
    for (const thing in codes.statusCodes) {
        expect(await getErrorInfo(thing)).toStrictEqual(codes.statusCodes[thing]);
    }
});