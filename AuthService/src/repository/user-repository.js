const { User , Role} = require('./../models/index');

class UserRepository{
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in User Repository');
            throw {error};
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where : {
                    id : userId
                }
            })
            return true;
        } catch (error) {
            console.log('Something went wrong in User Repository');
            throw {error};
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId , {
                attributes : ['email' , 'id']
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in User Repository');
            throw {error};
        }
    }

    async getByEmail(email){
        try {
            const user = await User.findOne({
                where : { email }
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in User Repository');
            throw {error};
        }
    }

    async isAdmin(userId){
        try {
            const adminRole = await Role.findOne({
                where : {
                    name : 'ADMIN'
                }
            });
            const user = await User.findByPk(userId);
            return user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong in User Repository');
            throw {error};
        }    
    }
}

module.exports = UserRepository;