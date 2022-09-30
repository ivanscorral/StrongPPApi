const DBConnector = require("../dbConnector");

class Series {
    constructor() {
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
    }
    // Serie{id, id_entrenamiento, id_ejercicio}
    
    newSerie(idEntrena, idExercise){
        this.dbConnection.insert('Serie(id_entrenamiento, id_ejercicio)', '(' + idEntrena + ', ' + idExercise + ')');
    }

    getSeries(idEntrenamiento, callback){
        var self = this;
        this.dbConnection.selectWhere('*', 'Serie', 'id_entrenamiento =  ' + idEntrenamiento + ' ORDER BY id DESC', function(results){
            var array = [];
            results.forEach(element => {
              array.push({id: element.id, id_entrenamiento: element.id_entrenamiento, id_ejercicio: element.id_ejercicio})  
            });
            callback(array);
        })
    }
}

module.exports = Series