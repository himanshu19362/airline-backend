const { AirportService } = require('./../services/index');

const airportService = new AirportService();

const create = async (req , res) =>{
    try {
        const response = await airportService.create(req.body);
        return res.status(201).json({
            success : true , 
            data : response , 
            message : 'Successfully created the airport' , 
            err : {}
        })
    } catch (error) {
        console.log('Error in Airport Controller');
        return res.status(500).json({
            success : false , 
            data : {}  ,
            message : 'Cannot create a new Airport' , 
            err : error
        })
    }
}

module.exports = {
    create
}