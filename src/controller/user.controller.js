const { createUser } = require('../service/user.service')

//接口回调函数
class UserController {
    //用户注册
    async register(ctx, next) {
        //1. 获取数据

        //2. 操作数据库
        const res = await createUser(ctx.request.body)

        //3. 返回结果
        ctx.body = {
            code: 200,
            message: '用户注册成功',
            data : {
                id: res.id,
                username: res.username
            }
        }
    }

    //用户登录
    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}

module.exports = new UserController()