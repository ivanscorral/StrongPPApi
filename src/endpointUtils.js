
class EndpointUtils {

    constructor( ){ }

    static generateResponseMessage(status, message){
        return {status: status, message: message}
    }
}

module.exports = EndpointUtils