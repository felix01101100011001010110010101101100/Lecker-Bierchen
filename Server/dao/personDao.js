
class PersonDao{

    constructor(dbConnection){
        this.dbconnection = dbConnection;
        this.username = req.user.bne;
    }

    personenDatenAbrufen(){
        this.dbconnection.get("SELECT * FROM Person WHERE benutzername=?"[this.username]);
    }




}

module.exports = PersonDao;