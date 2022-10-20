const DBConnector = require("../dbConnector");
const Repeticiones = require('./repes.js');

class Series {
    constructor() {
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
        this.repes = new Repeticiones();
    }
    // Serie{id, id_entrenamiento, id_ejercicio}
    
    newSerie(idEntrena, idExercise){
        this.dbConnection.insert('Serie(id_entrenamiento, id_ejercicio)', '(' + idEntrena + ', ' + idExercise + ')');
    }

    async getExerciseName(idSerie){ 
        return await this.dbConnection.selectWhereAsync('ex_name', 'Serie, Exercise', 'Serie.id = ' + idSerie + " AND Serie.id_ejercicio = Exercise.id");
    }

    async getSeries(idEntrenamiento){
        var results = await this.dbConnection.selectWhereAsync('*', 'Serie', 'id_entrenamiento =  ' + idEntrenamiento + ' ORDER BY id DESC');
        var array = [];

        results.forEach(element => {
            array.push({id: element.id, id_ejercicio: element.id_ejercicio})  
        });
        return array;
    }
    async getSeriesFull(entrenamientoId){
        var series = await this.getSeries(entrenamientoId)
        for(const serie of series){

            var repets = await this.repes.getRepeticiones(serie);
            serie.repeticiones = repets;
        }
        
        return series     
    }

}

module.exports = Series