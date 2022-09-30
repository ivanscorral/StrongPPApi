const DBConnector = require("../dbConnector");


class Repeticiones{
    constructor() {
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
    }
    /*
       Repeticion {
            id,
            id_serie,
            cantidad,
            peso float
        }
    */
   insertRepeticion(idSerie, cantidad, peso) {
        this.dbConnection.insert('Repeticion(id_serie, cantidad, peso)', '(' + idSerie + ', ' + cantidad + ', ' + peso + ')');
   }
   getLastRepeticionNumber(serieID, callback){
        this.dbConnection.selectWhere('orden', 'Repeticion', 'id_serie = ' + serieID + ' ORDER BY orden desc LIMIT 1', function(result){
            callback(result[0].orden); 
        });
   }
   getRepeticiones(serieId, callback){
        this.dbConnection.selectWhere('*', 'Repeticion', 'id_serie = ' + serieId + function(result){
            var array = [];
            result.forEach(repeticion => {
                array.push({id: repeticion.id, id_serie: repeticion.id_serie, cantidad: repeticion.cantidad, peso: repeticion.peso});
            });
            callback(array);
        });
   } 
}

module.exports = Repeticiones