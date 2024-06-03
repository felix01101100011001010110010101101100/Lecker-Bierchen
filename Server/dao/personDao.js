
class PersonDao{

    constructor(dbConnection){
        this.dbconnection = dbConnection;
        this.username = req.user.bne;
    }

    personenDatenAbrufen(){
        this.dbconnection.get("SELECT * FROM Person WHERE benutzername=?"[this.username]);
    }

    personenAnlegen(vn, nn, parsedAge, bn, hash, parsedFührerschein, lkIndex){
        this.dbconnection.post('INSERT INTO person (id, vorname, nachname, jahr, benutzername, passwort, fuehrerschein, landkreisid) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
                    [vn, nn, parsedAge, bn, hash, parsedFührerschein, lkIndex]);
    }

    exists(bn){
        var ret = this.dbconnection.get("SELECT COUNT(benutzername) AS cnt FROM Person WHERE benutzername=?"[bn]);
        if (ret.cnt == 1) 
            return true;

        return false;
    }

    passwortAbrufen(benutzername){
        this.dbconnection.get("SELECT passwort FROM Person WHERE benutzername=?"[benutzername])
    }

    landkreisAufrufen(landkreisname){
        var ret = this.dbconnection.get("SELECT id FROM Lankreis WHERE name=?"[landkreisname]);
        return ret;
    }

}

module.exports = PersonDao;