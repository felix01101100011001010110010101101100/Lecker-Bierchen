class EventDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    loadById(personid){
        this.dbconnection.get("SELECT * FROM Event INNER JOIN BeziehungPersonEvent ON Event.id = BeziehungPersonEvent.eventid WHERE personid=?"[personid])
    }

    anzahlMenschenImEvent(eventid){
        this.dbconnection.get("SELECT count(*) FROM Event INNER JOIN BeziehungPersonEvent ON Event.id=BeziehungPersonEvent.eventid WHERE eventid=?"[eventid]);
    }




}

module.exports = EventDao;