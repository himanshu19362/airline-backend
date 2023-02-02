const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error{
    constructor(
        message = 'Something went wrong',
        explanation = 'Service layer error',
        statusCodes = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name = 'Service Error';
        this.explanation = explanation;
        this.message = message;
        this.statusCodes = statusCodes;        
    }
}

module.exports = ServiceError;