const cron = require('node-cron');
const emailService = require('./../services/email-service');
const sender = require('./../config/email-config');

const setupJob = ()=>{
    cron.schedule('*/1 * * * *' , async()=>{
        const response = await emailService.findPendingEmails();
        response.map(email => {
            sender.sendBasicEmail({
                to : email.recepientEmail , 
                subject : email.subject , 
                text : email.content
            } , async(error , data) => {
                if(error){
                    console.log(error);
                }
                else{
                    await emailService.updateTicket(email.id , {status : 'SUCCESS'});
                }
            })            
        })
    })
}

module.exports = setupJob;