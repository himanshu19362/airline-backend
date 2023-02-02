const { FlightService } = require('./../services/index');

const flightService = new FlightService();

const create = async(req , res)=>{
    try {
        const flight = await flightService.createFlight(req.body);
        return res.status(201).json({
            success : true , 
            data : flight , 
            message : 'Successfully created a flight.' , 
            err : {}
        });
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Not able to create Flight.' , 
            err : error
        })
    }
}

const getAll = async(req , res)=>{
    try {
        const response = await flightService.getAllFlightData(req.query);
        return res.status(200).json({
            success : true , 
            data : response , 
            message : 'All flights fetched successfully.' ,
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot get all the flights' , 
            err : error
        })
    }
}

const get = async(req , res) => {
    try {
        const response = await flightService.getFlight(req.params.id);
        return res.status(200).json({
            success : true , 
            data : response , 
            message : 'Flight fetched successfully.' ,
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot get the flights' , 
            err : error
        })
    }
}

const update = async (req , res)=>{
    try{
        const response = await flightService.updateFlight(req.params.id , req.body);
        return res.status(200).json({
            data : response , 
            success : true , 
            message : 'Updated Successfully' , 
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            data : {} , 
            success : false , 
            message : 'Could not update the flight' , 
            err : error
        })
    }
}

module.exports = {
    create , getAll , get , update
}