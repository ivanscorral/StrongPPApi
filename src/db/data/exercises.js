const DBConnector = require("../dbConnector");

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
    getExercises(callback){
        var self = this
        this.dbConnection.select('*', 'Exercise', function(results) {
            var array = []
            results.forEach(element => {
                array.push({ id: element.id, ex_name: element.ex_name, img_url: element.img_url})
            });
            callback(array);
        })
    }
}

module.exports = Exercises