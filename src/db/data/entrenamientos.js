const DBConnector = require("../dbConnector");
const Tokens = require("../users/tokens");

class Entrenamientos {
    constructor() {
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
        this.tokens = new Tokens();
    }
    /* Entrenamiento: 
     { id: 1, fecha: now(), user_id: userid }
     */
    newEntrenamiento(token){
    var self = this;
        this.tokens.getTokenOwner(token, function(userId){
            self.dbConnection.insert('Entrenamiento(user_id, fecha)', '(' + userId + ', now())');
        });
    }

    getEntrenamientoOwner(idEntrenamiento, callback){
        this.dbConnection.selectWhere('user_id', 'Entrenamiento', 'Entrenamiento.id = ' + idEntrenamiento, function(result){
            callback(result[0].user_id);
        })
    }

    getLastEntrenamiento(userId, callback){
        var self = this
        this.dbConnection.selectWhere('*', 'Entrenamiento', 'Entrenamiento.user_id = ' + userId + ' ORDER BY Entrenamiento.fecha DESC LIMIT 1', function(result){
            callback({id: result[0].id, fecha: result[0].fecha, user_id: result[0].user_id})
        })
    }

    getAllEntrenamiento(userId, callback) {
        this.dbConnection.selectWhere('*', 'Entrenamiento', 'Entrenamiento.user_id = ' + userId + ' ORDER BY Entrenamiento.fecha DESC', function(result){
            var array = [];
            result.forEach(element => {
                array.push({id: element.id, fecha: element.fecha, user_id: element.user_id})
            });
            callback(array);
        })
    }
     

}

module.exports = Entrenamientos