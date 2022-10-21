var mysql = require('mysql');
var util = require('util');
class DBConnector{
    
    constructor() {
        this.con =  mysql.createConnection({
            host: "localhost",
            user: "strongpp",
            password: "strongapp123",
            database: "strongpp"
        });
        this.asyncCon = this.makeDb()
    }
    
    makeDb() {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "strongpp",
            password: "strongapp123",
            database: "strongpp"
        });
        return {
          query( sql, args ) {
            return util.promisify( connection.query )
              .call( connection, sql, args );
          },
          close() {
            return util.promisify( connection.end ).call( connection );
          }
        };
    }
    
    connect(){
        if(!this.connected){
            this.con.connect(function(err) {
                if (err){ console.log("SQL ERROR: " + err.sqlMessage) }
                this.connected = true;   
            });
        }
    }

    async selectWhereAsync(fields, table, condition, debug = false){
        let query = "SELECT " + fields + " FROM " + table + " WHERE " + condition;
        if(debug) console.log(query)
        return await this.asyncCon.query(query)
    }

    insert(into, values, error) {
        var sql = "INSERT INTO " + into + " VALUES " + values;
        this.con.query(sql, function (err, result) {
            if (err){ 
                error(err)
                console.log("SQL ERROR: " + err.sqlMessage) 
            }
            else{ console.log("1 record inserted");}
        });
    }

    select(fields, table, callback){
        this.con.query("SELECT " + fields + " FROM " + table , function (err, result, fields) {
            if (err){ console.log("SQL ERROR: " + err.sqlMessage) }
            callback(result);
        });
    } 
    selectWhere(fields, table, condition, callback){
        
        this.con.query("SELECT " + fields + " FROM " + table + " WHERE " + condition, function (err, result, fields) {
            if (err){ console.log("SQL ERROR: " + err.sqlMessage) }
            callback(result);
        });
        return this.result;
    }

}

module.exports = DBConnector