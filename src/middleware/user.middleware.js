const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const { 
    userFormateError, 
    userAlreadyExisted, 
    userRegisterError, 
    loginFormateError,
    loginRegisterError,
    userDoesNotExist,
    invalidPassword,
    pwdError,
    pwdFailed
} = require('../constant/err.type')

//判断注册传递参数
const userValidator = async (ctx, next) => {
    const data = ctx.request.body

     if(!data.username || !data.password || !data.phone){
        console.error('用户名、密码、手机号为空', data)
        return ctx.app.emit('error', userFormateError, ctx)
    }

    await next()
}

//判断登录传递参数
const loginValidator = async (ctx, next) => {
    const data = ctx.request.body

    if(!data.username || !data.password){
        console.error('登录账号或密码为空', data)
        return ctx.app.emit('error', loginFormateError, ctx)
    }

    await next()
}

//判断修改密码传递参数
const pwdValidator = async (ctx, next) => {
    const { password } = ctx.request.body

    if(!password) {
        console.error('修改密码不能为空')
        return ctx.app.emit('error', pwdError, ctx)
    }

    try {
        const res = await getUserInfo({ username: ctx.state.user.username })
        if(bcrypt.compareSync(password, res.password)) {
            console.error('修改密码与旧密码相同')
            return ctx.app.emit('error', pwdFailed, ctx)
        }
    } catch(err) {
        console.error('查找账号失败')
        return ctx.app.emit('error', loginRegisterError, ctx)
    }

    await next()
}

//判断用户名是否注册
const verifyUser = async (ctx, next) => {
    const data = ctx.request.body

    try {
        const res = await getUserInfo({ username: data.username })
        if(res){
            console.error('用户名已存在', data.username)
            return ctx.app.emit('error', userAlreadyExisted, ctx)
        }
    } catch(err) {
        console.error('查询用户名错误', err)
        return ctx.app.emit('error', userRegisterError, ctx)
    }

    await next()
}

//密码加密
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    //hash保存的是密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash

    await next()
}

//登录验证
const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body
    
    try {
        const res = await getUserInfo({ username })
        if(!res){
            console.error('用户名未注册', username)
            return ctx.app.emit('error', userDoesNotExist, ctx)
        }
        if(!bcrypt.compareSync(password, res.password)) {
            console.error('登录密码错误', password)
            return ctx.app.emit('error', invalidPassword, ctx)  
        }
    } catch(err) {
        console.error('查询账号错误', err)
        return ctx.app.emit('error', loginRegisterError, ctx)
    }
   
    await next()
}


module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    loginValidator,
    verifyLogin,
    pwdValidator
}