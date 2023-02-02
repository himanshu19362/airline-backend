const { UserService } = require('./../service/index');

const userService = new UserService();

const create = async (req , res) => {
    try {
        const user = await userService.create({
            email : req.body.email , 
            password : req.body.password
        });

        return res.status(201).json({
            success : true , 
            data : user , 
            message : 'New User Created' , 
            err : {}
        })
        
    } catch (error) {
        console.log('Error in User Controller');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Could not create a new user' , 
            err : error
        })
    }       
}

const signIn = async(req , res)=>{
    try {
        const response = await userService.signIn({
            email : req.body.email , 
            password : req.body.password
        });
    
        return res.status(201).json({
            success : true , 
            data : response , 
            message : "Successfully signed in" , 
            err : {}
        });    
    } catch (error) {
        console.log('Could not sign in');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot signin' , 
            err : error
        })
    }
    
}

const isAuthenticated = async (req , res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(201).json({
            success : true , 
            data : response , 
            message : "User authenticated successfully" , 
            err : {}
        });    
    } catch (error) {
        console.log('The user is not authenticated');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'The user is not authenticated' , 
            err : error
        })
    }
}

const isAdmin = async (req , res) => {
    try {
        const isAdmin = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            success : true , 
            data : response , 
            message : "Found whether admin or not" , 
            err : {}
        });    
    } catch (error) {
        console.log('Error while checking for admin');
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Error while checking for admin' , 
            err : error
        })
    }
}

module.exports = {
    create , signIn , isAuthenticated , isAdmin
}