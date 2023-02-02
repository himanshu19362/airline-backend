const { BookingService } = require('./../services/index');
const { StatusCodes } = require('http-status-codes')
const bookingService = new BookingService();
const { createChannel , publishMessage } = require('./../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./../config/serverConfig')

class BookingController{

    constructor(){
        // this.channel = channel;
    }

    async sendMessageToQueue(req , res){
        const channel = await createChannel();
        publishMessage(channel , REMINDER_BINDING_KEY , JSON.stringify({param : 'It is working'}));
        return res.status(200).json({
            message : 'Message Published'
        })
    }

    async create(req , res){
        try {
            const booking = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.CREATED).json({
                success : true , 
                data : booking , 
                message : 'Successfully completed booking' , 
                err : {}
            })    
        } catch (error) {
            return res.status(error.statusCodes).json({
                success : false , 
                data : {} , 
                message : error.message , 
                err : error.explanation
            })  
        }
        
    }
    
}

module.exports = BookingController