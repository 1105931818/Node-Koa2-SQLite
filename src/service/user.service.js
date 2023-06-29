const User = require('../model/use.model')

//数据库操作
class UserService {
    //用户注册
    async createUser({ username, password, phone, is_admin }) {
        //插入数据
        const res = await User.create({
            username,
            password,
            phone
        })
        return res.dataValues
    }
}

module.exports = new UserService()