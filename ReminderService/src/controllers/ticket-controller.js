const emailService = require('./../services/email-service');

const create = async(req , res)=>{
    try {
        const response = await emailService.createNotification(req.body);
        return res.status(201).json({
            success : true , 
            data : response , 
            message : 'Notification created successfully' , 
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false , 
            data : {} ,
            message : 'Couldnot create a notification' , 
            err : error
        })
    }
}

module.exports = {
    create
}