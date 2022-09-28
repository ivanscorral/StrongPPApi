const DBConnector = require("../dbConnector");
const Tokens = require('./tokens');

class Users {
    constructor() {
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
    }

    authorize_user(name, pass, callback){
        this.dbConnection.selectWhere("*", "User", "User.username = '" + name + "' AND User.pass ='" + pass + "'", function(result){
            if(result.length > 0) {
                const userId = result[0].id;
                //Generate and return session
                //check if token active exists
                const tokens = new Tokens();
                tokens.getLastToken(userId, function(token){
                    console.log(token);
                    callback(token)
                });
            }else{
                //Ignore login
                console.log('Login error');
            }
        })
    }
    authorize_token(token){
        const tokens = new Tokens();
        tokens.getToken(token, function(result) {
            if(tokens.tokenIsValid(result.start_time, result.timeout_s)) {
                console.log('token valid')
            }else{
                console.log('error processing token, check traces')
            }
        });
    }
}

module.exports = Users