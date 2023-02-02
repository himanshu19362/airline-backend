const { NotificationTicket } = require('./../models/index');
const { Op } = require('sequelize');
class TicketRepository{
    async getAll(){
        try {
            const response = await NotificationTicket.findAll();
            return response;
        } catch (error) {
            throw {error}
        }
    }

    async get(filter){
        try {
            const response = await NotificationTicket.findAll({
                where : {
                    status : filter.status , 
                    notificationTime : {
                        [Op.lte] : new Date()
                    }

                }
            });
            return response;
        } catch (error) {
            throw {error}
        }
    }

    async create(data){
        try {
            const response = await NotificationTicket.create(data);
            return response;
        } catch (error) {
            throw {error};
        }
    }

    async updateTicket(ticketId , data){
        try {
            const response = await NotificationTicket.findByPk(ticketId);
            if(data.status)    response.status = data.status;
            await ticket.save();
            return response;
        } catch (error) {
            throw {error};
        }
    }
}

module.exports = TicketRepository;