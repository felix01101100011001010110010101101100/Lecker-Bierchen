const bcrypt = require('bcrypt');
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

    personAnzeigen(benutzername){
        return new Promise((resolve, reject)=>{
            this.dbconnection.get("SELECT * FROM Person JOIN Landkreis ON Person.landkreisid = Landkreis.id WHERE benutzername=?", [benutzername], (err,row)=>{
                if (err){
                    console.error("Fehler");
                    reject("Fehler");
                }
                else{
                    resolve(row);
                }
            })}
        )}
    

    comparePassword(bn, psw) {
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT passwort FROM Person WHERE benutzername=?", [bn], function(err, row) {
                if (err) {
                    reject(err);
                } else if (row) {
                    bcrypt.compare(psw, row.passwort)
                        .then(isMatch => resolve(isMatch))
                        .catch(err => reject(err));
                } else {
                    resolve(false);
                }
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

    loadAll() {
        const landkreisDao = new LandkreisDao(this._conn);
        const gruppeDao = new GruppeDao(this._conn);
        const eventDao = new EventDao(this._conn);

        var sql = 'SELECT * FROM Person';
        var statement = this._conn.prepare(sql);
        var result = statement.all(); 

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            if (result[i].fuehrerschein == 0) 
                result[i].fuehrerschein = false;
            else 
                result[i].fuehrerschein = true;
    
            result[i].landkreis = landkreisDao.loadById(result[i].landkreisid);
            delete result[i].landkreisid;

            result[i].gruppen = gruppeDao.loadForPerson(result[i].id);
            result[i].events = eventDao.loadForPerson(result[i].id);
        }

        return result;
    }

}

module.exports = PersonDao;