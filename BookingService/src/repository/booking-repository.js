const { Booking } = require('./../models/index');
const { StatusCodes } = require('http-status-codes');
const { AppError , ValidationError } = require('./../utils/errors/index')

class BookingRepository{
    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;
            
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError('Repository Error' , 'Cannot create booking' , 'There was some error creating the booking' , StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(bookingId , data){
        try {
            const booking = await Booking.findByPk(bookingId);
            if(data.status){
                booking.status = data.status;
            }
            booking.save()
            return booking;
            
        } catch (error) {
            throw new AppError('Repository Error' , 'Cannot update Booking' , 'Some issue in updating' , StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = BookingRepository;