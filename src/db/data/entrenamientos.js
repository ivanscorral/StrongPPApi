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
            console.log(userId);
            self.dbConnection.insert('Entrenamiento(user_id, fecha)', '(' + userId + ', now())');
            self.getLastEntrenamiento(userId, function(entrenamiento) {
                callback(entrenamiento);
            });
        });
    }

    getLastEntrenamiento(userId){

    }

}

module.exports = Entrenamientos