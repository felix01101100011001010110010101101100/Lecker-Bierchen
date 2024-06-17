class GruppenDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }
    alleBenutzerEinerGruppe(gruppenid){
        
    }

    neueGruppe(gruppenname, status, key){
        this.dbconnection.run("INSERT INTO Gruppe(gruppenname, status, key) VALUES(?,?,?)",[gruppenname, status, key]);
    }

    alleGruppenDesBenutzers(personid) {
        
        return new Promise((resolve, reject) => {
            //this.dbconnection.all("SELECT Gruppe.gruppenname FROM BeziehungPersonGruppe JOIN Gruppe ON BeziehungPersonGruppe.gruppenid = Gruppe.id WHERE BeziehungPersonGruppe.personid = ?", [personid], (err, rows) => {
            this.dbconnection.all("SELECT gruppenname FROM Gruppe", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    // Transformiert das Ergebnis in das gewünschte Format
                    const formatierteDaten = rows.map(row => {
                        return { gruppenname: row.gruppenname };
                    });
                    resolve(formatierteDaten);
                }
            });
        });
    }
   

}
module.exports = GruppenDao;