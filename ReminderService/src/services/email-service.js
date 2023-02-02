const sender = require('./../config/email-config');
const TicketRepository = require('./../repository/ticket-repository')

const ticketRepository = new TicketRepository();
// const sendBasicEmail = async(mailFrom , mailTo , mailSubject , mailBody)=>{
//     sender.sendMail({
//         from : mailFrom , 
//         to : mailTo , 
//         subject : mailSubject , 
//         text : mailBody
//     })    
// }

const findPendingEmails = async()=>{
    try {        
        const response = await ticketRepository.get({status : 'PENDING'});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async(data) => {
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        throw {error};
    }
}

const updateTicket = async(ticketId , data)=>{
    try {
        const response = await ticketRepository.updateTicket(ticketId , data);
        return response;
    } catch (error) {
        throw {error};
    }
}

module.exports = {
    findPendingEmails , createNotification , updateTicket
};