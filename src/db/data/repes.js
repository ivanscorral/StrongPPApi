const DBConnector = require("../dbConnector");
const Tokens = require('../users/tokens');

class Repeticiones{
    constructor() {
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
        this.tokens = new Tokens();
    }
    /*
       Repeticion {
            id,
            id_serie,
            cantidad,
            peso float
        }
    */
   async test(){
    return await this.tokens.getTokenOwner('5PeTB16hsTWDShpyfDwZTf');
   }
   insertRepeticion(idSerie, cantidad, peso) {
        this.dbConnection.insert('Repeticion(id_serie, cantidad, peso)', '(' + idSerie + ', ' + cantidad + ', ' + peso + ')');
   }
   async getLastRepeticionNumber(serieID){
        var result = await this.dbConnection.selectWhereAsync('orden', 'Repeticion', 'id_serie = ' + serieID + ' ORDER BY orden desc LIMIT 1');
        return result[0].orden; 
   }
   async getRepeticiones(serie){
        var result = await this.dbConnection.selectWhereAsync('*', 'Repeticion', 'id_serie = ' + serie.id);
        var array = [];
        result.forEach(repeticion => {
            array.push({id: repeticion.id, cantidad: repeticion.cantidad, peso: repeticion.peso});
        });
        return array;
   } 
}

module.exports = Repeticiones