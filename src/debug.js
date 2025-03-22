module.exports = (app) => {
    app.get("/500test", (req, res) => {
        returnError(req, res, "401", "moi");
    });
    
    app.get("/test", (req, res) => {
        throw new Error("TEST");
    });
    
    app.get("/debug/errorInfo", async (req, res) => {
        if (!req.query.statusCode) {
            returnError(req, res, "400", "parameter statusCode required");
            return ;
        }
    
        let info = await getErrorInfo(req.query.statusCode);
    
        if (info.statusCode == 500 && req.query.statusCode != 500) {
            res.status(500);
            returnError(req, res, "500", info.customMessage);
            return ;
        }
    
        res.json(info);
    });
    
    app.get("/debug/errorInfoGUI", async (req, res) => {
        if (!req.query.statusCode) {
            returnError(req, res, "400", "query parameter statusCode required");
            return ;
        }
    
        let info = await getErrorInfo(req.query.statusCode);
    
        res.render("errorPage", info);
    });
}