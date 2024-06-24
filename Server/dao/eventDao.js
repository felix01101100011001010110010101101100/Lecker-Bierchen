class EventDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    loadById(id) {  //alle daten für die übersicht laden
        return new Promise((resolve, reject) => {
            this.dbconnection.all("SELECT * FROM Event INNER JOIN BeziehungPersonEvent ON Event.id = BeziehungPersonEvent.eventid WHERE personid=?", [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    anzahlMenschenImEvent(eventid){
        this.dbconnection.get("SELECT count(*) FROM Event INNER JOIN BeziehungPersonEvent ON Event.id=BeziehungPersonEvent.eventid WHERE eventid=?"[eventid]);
    }

    eventAnlegen(eventname, ort, zeit, bemerkung, gruppeid){
        this.dbconnection.run("INSERT INTO Event(eventname, ort, zeit, bemerkung, gruppeid) VALUES(?,?,?,?,?)",[eventname, ort, zeit, bemerkung, gruppeid]);
    }

    deleteEvent(eventid){
        this.dbconnection.run("DELETE FROM Event WHERE id=?", [eventid]);
    }

    dabei(id, eventname){
        this.dbconnection.run("INSERT INTO BeziehungPersonEvent(personid, eventid) VALUES(?,?)",[id, eventname]);
    }

}

module.exports = EventDao;