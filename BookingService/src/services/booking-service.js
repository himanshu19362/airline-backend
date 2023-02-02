const { BookingRepository } = require('./../repository/index')
const { FLIGHT_SERVICE_PATH } = require('./../config/serverConfig')
const axios = require('axios');
const { ServiceError } = require('../utils/errors');

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            // console.log(FLIGHT_SERVICE_PATH)
            const response = await axios.get(getFlightUrl); 
            
            const flightData = response.data.data; 
            console.log(flightData);
            let flightPrice = flightData.price;
            console.log(flightPrice);
            if(data.noOfSeats > flightData.totalSeats){
                console.log('I am in the error');
                throw new ServiceError('Something went wrong in booking process' , 'Insufficient seats');
            }

            const totalPrice = data.noOfSeats * flightPrice;
            console.log(totalPrice);
            const bookingPayload = {...data , totalPrice};
            const booking = await this.bookingRepository.create(bookingPayload);
            
            await axios.patch(getFlightUrl , {totalSeats : flightData.totalSeats - data.noOfSeats});
            console.log('Flight Updated ');
            const finalBooking = await this.bookingRepository.update(booking.id , {status : 'Booked'})

            return finalBooking;
        } catch (error) {
            console.log("I reached here")
            if(error.name == 'Repository Error' || error.name == 'Validation Error'){
                throw error;
            }
            throw new ServiceError();
        }        
    }
}

module.exports = BookingService;