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
    newEntrenamiento(token, callback){
    var self = this;
        this.tokens.getTokenOwner(token, function(userId){
            self.dbConnection.insert('Entrenamiento(user_id, fecha)', '(' + userId + ', now())');
            self.getLastEntrenamiento(userId, function(entrenamiento) {
                callback(entrenamiento);
            });
        });
    }

    getLastEntrenamiento(userId, callback){
        var self = this
        this.dbConnection.selectWhere('*', 'Entrenamiento', 'Entrenamiento.user_id = ' + userId + ' ORDER BY Entrenamiento.id DESC LIMIT 1', function(result){
            callback({id: result[0].id, fecha: result[0].fecha, user_id: result[0].user_id})
        })
    }

     

}

module.exports = Entrenamientos