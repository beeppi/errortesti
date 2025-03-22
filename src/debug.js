module.exports = (app) => {
    app.get("/500test", (req, res) => {
        returnError(res, req, "401", "moi");
    });
    
    app.get("/test", (req, res) => {
        throw new Error("TEST");
    });
    
    app.get("/debug/errorInfo", async (req, res) => {
        if (!req.query.statusCode) {
            returnError(res, req, "400", "parameter statusCode required");
            return ;
        }
    
        let info = await getErrorInfo(req.query.statusCode);
    
        if (info.statusCode == 500 && req.query.statusCode != 500) {
            res.status(500);
            returnError(res, req, "500", info.customMessage);
            return ;
        }
    
        res.json(info);
    });
    
    app.get("/debug/errorInfoGUI", async (req, res) => {
        if (!req.query.statusCode) {
            returnError(res, req, "400", "query parameter statusCode required");
            return ;
        }
    
        let info = await getErrorInfo(req.query.statusCode);
    
        res.render("errorPage", info);
    });
}