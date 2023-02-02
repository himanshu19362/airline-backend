const validateFlight = (req , res , next)=>{
    if(
        !req.body.flightNumber || 
        !req.body.airplaneId || 
        !req.body.departureAirportId || 
        !req.body.arrivalAirportId || 
        !req.body.departureTime || 
        !req.body.arrivalTime || 
        !req.body.price
    ){
        return res.status(400).json({
            success : false , 
            data : {} , 
            message : 'Invalid Request Body' , 
            err : 'Missing mandatory fields to create a flight'
        })
    }
    next();
}

module.exports = {
    validateFlight
}