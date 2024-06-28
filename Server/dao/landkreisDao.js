class LandkreisDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }
    landkreisId(landkreisname) {
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT id FROM Landkreis WHERE name=?", [landkreisname], function(err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row ? row.id : null);
            });
        });
    }

}
module.exports = LandkreisDao;