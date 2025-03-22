const fs = require("fs");

let archivenum = 0;

fs.rm("./app/other/errorArchive", { recursive: true, force: true }, (err) => {
    if (err) {
        console.log(err);
    }
});


export async function returnError(res, req, statusCode, customMessage) {
    let errorInfo = await getErrorInfo(statusCode);
    
    if (!errorInfo.customMessage) {
        errorInfo.customMessage = customMessage;
    }

    console.log("new error happened: " + errorInfo.statusCode);

    uploadToArchive(req, statusCode, customMessage, errorInfo.extra);
    
    res.status(errorInfo.statusCode);
    res.render("errorPage", errorInfo);
}

export function uploadToArchive(req, statusCode, customMessage, extra) {

    const updateData = {
        statusCode: statusCode,
        customMessage: customMessage,
        url: req.url
    }

    if (extra) {
        updateData.extra = extra;
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

export async function getErrorInfo(error) {
    let joku = fs.readFileSync("./app/public/errors/errorInfo.json");

    let asd = await JSON.parse(joku);
    let asdasd = await asd.statusCodes[error];

    if (!asdasd) {
        let problem = asd.statusCodes["500"];
        problem.statusCode = Number(error);
        problem.error = "unknown error";
        problem.message = "we don't know what the error you got means";
        problem.extra = "STATUS CODE " + error + " NOT IMPLEMENTED";
        return problem;
    }

    return asdasd;
}