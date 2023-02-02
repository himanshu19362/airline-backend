const { CityService } = require('./../services/index');

const cityService = new CityService();

const create = async(req , res)=>{
    try {
        const city = await cityService.createCity(req.body);
        return res.status(201).json({
            success : true , 
            data : city , 
            message : 'Successfully created the city.' , 
            err : {}
        })
    } catch (error) {
        console.log('Error in Controller');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Not able to create city.' , 
            err : error
        })
    }
}

const destroy = async(req , res)=>{
    try {
        const response = await cityService.deleteCity(req.params.id);
        return res.status(201).json({
            success : true ,              
            message : 'Successfully deleted the city.' , 
            err : {} , 
            data : response
        })
    } catch (error) {
        console.log('Error in Controller');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Not able to delete city.' , 
            err : error
        })
    }
}

const update = async(req , res)=>{
    try {
        const city = await cityService.updateCity(req.params.id , req.body);
        return res.status(201).json({
            success : true , 
            data : city , 
            message : 'Successfully updated the city.' , 
            err : {}
        })
    } catch (error) {
        console.log('Error in Controller');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Not able to update the city.' , 
            err : error
        })
    }
}

const get = async(req , res)=>{
    try {
        const city = await cityService.getCity(req.params.id);
        return res.status(201).json({
            success : true , 
            data : city , 
            message : 'Successfully fetched the city.' , 
            err : {}
        })
    } catch (error) {
        console.log('Error in Controller');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Not able to get the city.' , 
            err : error
        })
    }
}

const getAll = async(req , res)=>{
    try {
        const cities = await cityService.getAllCities(req.query);
        return res.status(200).json({
            success : true , 
            data : cities , 
            message : 'Fetched All Cities Successfully'
        })

    } catch (error) {
        console.log('Error in Controller');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : "Couldn't fetch all the cities." , 
            err : error
        })
    }
}

module.exports = {
    create , destroy , update , get , getAll
}