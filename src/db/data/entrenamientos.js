const DBConnector = require("../dbConnector");
const Tokens = require("../users/tokens");
const Series = require("./series");
const Repeticiones = require("./repes");

class Entrenamientos {
    constructor() {
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
        this.tokens = new Tokens();
        this.series = new Series();
        this.repes = new Repeticiones();
    }
    /* Entrenamiento: 
     { id: 1, fecha: now(), user_id: userid }

     User{ id,
        entrenamientos[ 
            Entrenamiento {id, 
                series[
                    serie { id
                        repes[
                            repe {
                                id,
                                cantidad,
                                peso float
                            }
                        ]
                    }
                ]
            }
        ]
    }
     */
    async getFullEntrenamiento(entrenamientoId){
        var entrenamiento = await this.getEntrenamiento(entrenamientoId);          
        var seriesFull = await this.series.getSeriesFull(entrenamiento.id);
        return   { id: entrenamiento.id, series: seriesFull }

    }
    async newEntrenamiento(token){
        var userId = await this.tokens.getTokenOwner(token);
        this.dbConnection.insert('Entrenamiento(user_id, fecha)', '(' + userId + ', now())')
    }

    async getEntrenamientoOwner(idEntrenamiento){
        var result = await this.dbConnection.selectWhereAsync('user_id', 'Entrenamiento', 'Entrenamiento.id = ' + idEntrenamiento);
        return result[0].user_id;
    }
    async getEntrenamiento(entrenamientoId){
        var result = await this.dbConnection.selectWhereAsync('*', 'Entrenamiento', 'Entrenamiento.id = ' + entrenamientoId);
        return {id: result[0].id, fecha: result[0].fecha, user_id: result[0].user_id}
    }
    async getLastEntrenamiento(userId){
        var result = await this.dbConnection.selectWhereAsync('*', 'Entrenamiento', 'Entrenamiento.user_id = ' + userId + ' ORDER BY Entrenamiento.fecha DESC LIMIT 1');
        return {id: result[0].id, fecha: result[0].fecha, user_id: result[0].user_id}
    }

    async getAllEntrenamiento(userId) {
        var result = await this.dbConnection.selectWhereAsync('*', 'Entrenamiento', 'Entrenamiento.user_id = ' + userId + ' ORDER BY Entrenamiento.fecha DESC')
        var array = [];
        result.forEach(element => {
            array.push({id: element.id, fecha: element.fecha, user_id: element.user_id})
        });
        return array;
    }
     

}

module.exports = Entrenamientos