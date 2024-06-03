class EventDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    loadById(id){
        this.dbconnection.get("SELECT * FROM Event INNER JOIN BeziehungPersonEvent ON Event.id = BeziehungPersonEvent.eventid WHERE personid=?"[id])
    }

    


}

module.exports = EventDao;