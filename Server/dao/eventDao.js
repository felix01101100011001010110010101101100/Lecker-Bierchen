class EventDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    loadById(id) {
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

}

module.exports = EventDao;