const { UserRepository } = require('./../repository/index')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('./../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Error in User Service Layer');
            throw {error};
        }
    }

    async destroy(userId){
        try {
            await this.userRepository.destroy(userId);
                        
        } catch (error) {
            console.log('Error in User Service Layer');
            throw {error};
        }
    }

    createToken(user){
        try {
            const token = jwt.sign(user , JWT_KEY , {expiresIn : '1h'});
            return token;
        } catch (error) {
            console.log('Couldnot create token');
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;    
        } catch (error) {
            console.log('Error in User Service Layer . Token not verified');
            throw {error};
        }        
    }

    checkPassword(userInputPlainPassword , encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword , encryptedPassword);
        } catch (error) {
            console.log('Error while checking password');
            throw {error};
        }
    }

    async signIn({email , password}){
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(password , user.password);
            if(!passwordMatch){
                console.log('Password didnot match');
                throw {error : 'Incorrect Password'}
            }

            const jwtToken = this.createToken({email , id : user.id});
            return jwtToken;

        } catch (error) {
            console.log('Error while signing in');
            throw {error};
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                console.log('Invalid Token');
                throw {error : 'Invalid Token'};
            }
            const user = await this.userRepository.getById(response.id);

            if(!user){
                console.log('No such user exists');
                throw {error : 'No user with this token exists'};
            }

            return user.id;
        } catch (error) {
            console.log('Error in Authentication');
            throw {error};
        }
    }

    async isAdmin(userId){
        try {
            const isAdmin = await this.userRepository.isAdmin(userId);
            return isAdmin;
        } catch (error) {
            console.log('Error while checking admin')
            throw {error}
        }
    }
}

module.exports = UserService;