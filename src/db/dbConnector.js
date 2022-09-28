var mysql = require('mysql');

class DBConnector{
    
    constructor() {
        this.con =  mysql.createConnection({
            host: "localhost",
            user: "strongpp",
            password: "strongapp123",
            database: "strongpp"
        });
        
    }  
    
    connect(){
        if(!this.connected){
            this.con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
                this.connected = true;   
            });
        }
    }

    insert(into, values) {
        var sql = "INSERT INTO " + into + " VALUES " + values;
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }

    select(fields, table){
        this.con.query("SELECT " + fields + " FROM " + table , function (err, result, fields) {
            if (err) throw err;
        });
    } 
    selectWhere(fields, table, condition, callback){
        
        this.con.query("SELECT " + fields + " FROM " + table + " WHERE " + condition, function (err, result, fields) {
            if (err) throw err;
            callback(result);
        });
        return this.result;
    }
    close(){

    }
}

module.exports = DBConnector