const { FlightRepository , AirplaneRepository }  = require('./../repository/index');
const { compareTime } = require('./../utils/helper')

class FlightService{
    constructor(){
        this.flightRepository = new FlightRepository();
        this.airplaneRepository = new AirplaneRepository();
    }

    async createFlight(data){
        try {
            if(!compareTime(data.departureTime , data.arrivalTime)){
                throw {error : 'Arrival Time cannot be less than departure time'}
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({...data , totalSeats : airplane.capacity});
            return flight;    
        } catch (error) {
            console.log('Error in Flight Service');
            throw {error};            
        }        
    }

    async getAllFlightData(data){
        try {
            const flights = await this.flightRepository.getAllFlights(data);
            return flights;
        } catch (error) {
            console.log('Error in Flight Service');
            throw {error}
        }
    }

    async getFlight(id){
        try {
            const flights = await this.flightRepository.getFlight(id);
            return flights;
        } catch (error) {
            console.log('Error in Flight Service');
            throw {error}
        }
    }

    async updateFlight(flightId , data){
        try{
            const flight = await this.flightRepository.updateFlight(flightId , data);
            return true;
        } catch (error) {
            console.log('Error in Service Layer');
            throw error;
        }
    }
}

module.exports = FlightService;