
class PersonDao{

    constructor(dbConnection){
        this.dbconnection = dbConnection;
        this.username = req.user.bne;
    }

    personenDatenAbrufen(){
        this.dbconnection.get("SELECT * FROM Person WHERE benutzername=?"[this.username]);
    }

<<<<<<< HEAD
    personenAnlegen(vn, nn, parsedAge, bn, hash, parsedFührerschein, lkIndex){
        this.dbconnection.post('INSERT INTO person (id, vorname, nachname, jahr, benutzername, passwort, fuehrerschein, landkreisid) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
                    [vn, nn, parsedAge, bn, hash, parsedFührerschein, lkIndex]);
                    
    passwortAbrufen(benutzername){
        this.dbconnection.get("SELECT passwort FROM Person WHERE benutzername=?"[benutzername])
        }
                
=======
    passwortAbrufen(benutzername){
        this.dbconnection.get("SELECT passwort FROM Person WHERE benutzername=?"[benutzername])
    }



>>>>>>> c5325f1b5b536555ad1f249ac368f82d4854d6a6

}

module.exports = PersonDao;