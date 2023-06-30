const User = require('../model/use.model')

//数据库操作
class UserService {
    //用户注册
    async createUser({ username, password, phone }) {
        //插入数据
        const res = await User.create({
            username,
            password,
            phone
        })
        return res.dataValues
    }

    //搜索用户名
    async getUserInfo({ id, username, phone }) {
       const whereOpt = {}
       id && Object.assign(whereOpt, { id })
       username && Object.assign(whereOpt, { username })
       phone && Object.assign(whereOpt, {phone})

       const res = await User.findOne({
          attributes: ['id', 'username', 'password', 'phone', 'is_admin'],
          where: whereOpt
       })

       return res ? res.dataValues : null
    }

    //修改用户信息
    async updateById({ id, username, password, phone }) {
        const whereOpt = { id }
        const newUser = {}
        username && Object.assign(newUser, { username })
        password && Object.assign(newUser, { password })
        phone && Object.assign(newUser, { phone })

        const res = await User.update(newUser, { where: whereOpt })

        return res[0] > 0 ? true : false
    }
}

module.exports = new UserService()