const { Flight } = require('./../models/index');
const { Op } = require('sequelize')
class FlightRepository{

    #createFilter(data){
        let filter = {};

        if(data.arrivalAirportId){
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if(data.departureAirportId){
            filter.departureAirportId = data.departureAirportId;
        }
        if(data.minPrice){
            Object.assign(filter , {price : {[Op.gte] : data.minPrice}});
        }
        
        return filter;
    }


    async createFlight(data){
        try {
            const flight = await Flight.create(data);
            return flight;    
        } catch (error) {
            console.log('Error in Flight Repository');
            throw {error};
        }        
    }

    async getFlight(flightId){
        try {            
            const flight = await Flight.findByPk(flightId);
            return flight;    
        } catch (error) {            
            console.log('Error in Flight Repository');
            throw {error}
        }        
    }

    async getAllFlights(filter){
        try {
            console.log(filter)
            const filterObject = this.#createFilter(filter);
            const flights = await Flight.findAll({
                where : filterObject
            });

            return flights;    
        } catch (error) {
            console.log('Error in Flight Repository');
            throw {error}
        }        
    }

    async updateFlight(flightId , data){
        try{
            console.log('Hi , I am here');
            const flight = await Flight.update(data , {
                where : {
                    id : flightId
                }
            });
            // console.log(flight);
            return true;
        } catch(error) {
            console.log('Error in Repository Layer');
            throw error;
        }
    }
}

module.exports = FlightRepository;