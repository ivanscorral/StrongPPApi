const TokenGenerator = require('uuid-token-generator');
const DBConnector = require('../dbConnector')

class Tokens {
    constructor(){
        this.dbConnection = new DBConnector();
        this.dbConnection.connect();
        this.tokenGenerator = new TokenGenerator();
    }
    
    async getTokenOwner(token){
        var result = await this.getToken(token);
        console.log(result);
        return result.user_id;

    }

    async getToken(token){
        var result = await this.dbConnection.selectWhereAsync('*', 'User_Session', "token = '" + token + "' LIMIT 1");
        if(result[0]) { return {token: result[0].token, user_id: result[0].user_id,  start_time: result[0].start_time, timeout_s: result[0].timeout_s} }

    }
    
    generateToken(userId){
        const generated = this.tokenGenerator.generate();
        console.log('Generated token for user ' + userId + ' is: ' + generated);
        this.dbConnection.insert("User_Session(token, user_id, start_time, timeout_s)", "('" + generated + "', "+ userId+", now(), 3600)");
        return generated;
    }

    tokenIsValid(start_time, timeout_s){
        const timeout_min = timeout_s / 60;
        start_time.setMinutes(start_time.getMinutes() + timeout_min);
        return !(new Date().getTime() > start_time.getTime())
    }

    getLastToken(userId, callback) {
        var self = this
        this.dbConnection.selectWhere('token, start_time, timeout_s', 'User_Session', "User_Session.user_id = " + userId + " ORDER BY id DESC LIMIT 1", function(result){
            if(result[0]){
                const mDate = result[0].start_time;
                const token = result[0].token;
                const timeout_s = result[0].timeout_s;
                if (self.tokenIsValid(mDate, timeout_s)){
                    callback(token);
                }else{
                    callback(self.generateToken(userId));
                }
            }else{
                callback(self.generateToken(userId));
            }
        })
    }

    

}

module.exports = Tokens