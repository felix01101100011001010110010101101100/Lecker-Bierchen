
class PersonDao{

    constructor(dbConnection){
        this.dbconnection = dbConnection;
        this.username = req.user.bne;
    }

    personenDatenAbrufen(){
        this.dbconnection.get("SELECT * FROM Person WHERE benutzername=?"[this.username]);
    }

    passwortAbrufen(benutzername){
        this.dbconnection.get("SELECT passwort FROM Person WHERE benutzername=?"[benutzername])
    }




}

module.exports = PersonDao;