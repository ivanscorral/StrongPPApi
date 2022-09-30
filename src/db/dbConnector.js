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
                if (err) throw err;
                console.log("Connected!");
                this.connected = true;   
            });
        }
    }

    async selectWhereAsync(fields, table, condition){
        return await this.asyncCon.query("SELECT " + fields + " FROM " + table + " WHERE " + condition)
    }

    insert(into, values) {
        var sql = "INSERT INTO " + into + " VALUES " + values;
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }

    select(fields, table, callback){
        this.con.query("SELECT " + fields + " FROM " + table , function (err, result, fields) {
            if (err) throw err;
            callback(result);
        });
    } 
    selectWhere(fields, table, condition, callback){
        
        this.con.query("SELECT " + fields + " FROM " + table + " WHERE " + condition, function (err, result, fields) {
            if (err) throw err;
            callback(result);
        });
        return this.result;
    }

}

module.exports = DBConnector