const DBConnector = require("../../db/dbConnector");

class Exercises {
    constructor() {
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
    }
    insert_exercise(name, url){
        if(url){
            this.dbConnection.insert('Exercise(ex_name, img_url)', "('" + name + "', '" + url + "')");
        }else{
            this.dbConnection.insert('Exercise(ex_name)', "('" + name + "')");
        }
    }
}

module.exports = Exercises