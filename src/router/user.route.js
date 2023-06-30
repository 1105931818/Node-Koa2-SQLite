const Router = require('@koa/router')

const { 
    userValidator, 
    verifyUser, 
    crpytPassword, 
    loginValidator,
    verifyLogin,
    pwdValidator
} = require('../middleware/user.middleware')
const {
    auth
} = require('../middleware/auth.middleware')
const { register, login, revise } = require('../controller/user.controller')
const router = new Router({ prefix: '/user' })

//用户注册
router.post('/register', userValidator, verifyUser, crpytPassword, register)

//用户登录
router.post('/login', loginValidator, verifyLogin, login)

//修改密码
router.patch('/revise', auth, pwdValidator, crpytPassword, revise)

module.exports = router