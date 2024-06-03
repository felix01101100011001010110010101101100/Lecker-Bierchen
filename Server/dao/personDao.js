
class PersonDao{

    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    personenDatenAbrufen(bn){
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT * FROM Person WHERE benutzername=?", [bn], function(err, row) {
                if (err) {
                    reject(err);
                }
                console.log("l"+bn);
                console.log(row);
                resolve(row);
            });
        });
    }

    personenAnlegen(vn, nn, parsedAge, bn, hash, parsedFührerschein, lkIndex){
        this.dbconnection.run('INSERT INTO person (id, vorname, nachname, jahr, benutzername, passwort, fuehrerschein, landkreisid) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
                    [vn, nn, parsedAge, bn, hash, parsedFührerschein, lkIndex]);
    }

  
    passwortAbrufen(benutzername){
        this.dbconnection.get("SELECT passwort FROM Person WHERE benutzername=?", [benutzername])
    }

    landkreisAufrufen(landkreisname){
        var ret = this.dbconnection.get("SELECT id FROM Lankreis WHERE name=?", [landkreisname]);
        return ret;
    }

}

module.exports = PersonDao;