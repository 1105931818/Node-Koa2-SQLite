const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateById } = require('../service/user.service')
const { userRegisterError, loginFailed, invalidPwd } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')

//接口回调函数
class UserController {
    //用户注册
    async register(ctx, next) {
        //1. 获取数据
        const data = ctx.request.body

        try {
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
        } catch(err){
            console.error('注册失败',  err)
            ctx.app.emit('error', userRegisterError, ctx )
        }
    }

    //用户登录
    async login(ctx, next) {
        const { username, password } = ctx.request.body

        //获取用户信息（token在payload中记录，id,username,is_admin)
        try {
            const { password, phone, ...res } = await getUserInfo({ username })
            
            ctx.body = {
                code: 200,
                message: '登录成功',
                data: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1h' })
                }
            }
        } catch (err) {
            console.error('用户登录失败', err)
            ctx.app.emit('error', loginFailed, ctx)
        }
    }

    //修改密码
    async revise(ctx, next) {
        const id = ctx.state.user.id
        const password = ctx.request.body.password

        try {
            const res = await updateById({ id, password })
            if(res){
                ctx.body = {
                    code: 200,
                    message: '修改成功',
                    data: {}
                }
            } else {
                ctx.body = {
                    code: 401,
                    message: '修改失败',
                    data: {}
                }
            }
        } catch (err) {
            console.error('密码修改失败', err)
            ctx.app.emit('error', invalidPwd, ctx)
        }
    }
}

module.exports = new UserController()