class EventDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    loadById(id){
        this.dbconnection.get("SELECT * FROM Event INNER JOIN BeziehungPersonEvent ON Event.id = BeziehungPersonEvent.eventid WHERE personid=?"[personid])
    }

    anzahlMenschenImEvent(eventid){
        this.dbconnection.get("SELECT count(*) FROM Event INNER JOIN BeziehungPersonEvent ON Event.id=BeziehungPersonEvent.eventid WHERE eventid=?"[eventid]);
    }

    eventAnlegen(eventname, ort, zeit, bemerkung){
        this.dbconnection.run("INSERT INTO Event(eventname, ort, zeit, bemerkung) VALUES(?,?,?,?)",[eventname, ort, zeit, bemerkung]);
    }

}

module.exports = EventDao;