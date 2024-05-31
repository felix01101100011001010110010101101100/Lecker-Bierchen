const express = require('express');
var router = express.Router();

class LandkreisDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    landkreisAufrufen(landkreisname){
        var ret = this.dbconnection.get("SELECT id FROM Lankreis WHERE name=?"[landkreisname]);
        return ret;
    }


}


module.exports = router;