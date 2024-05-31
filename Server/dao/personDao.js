
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

    passwortAbrufen(benutzername){
        this.dbconnection.get("SELECT passwort FROM Person WHERE benutzername=?"[benutzername])
        }


}

module.exports = PersonDao;