const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')
const { tokenError, invalidToken } = require('../constant/err.type')

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try{
        //user中包含payload的信息id,username,is_admin
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user
    } catch(err) {
        switch(err.name) {
            case 'TokenExpiredError':
                console.error('token过期', err)
                return ctx.app.emit('error', tokenError, ctx)
            case 'JsonWebTokenError':
                console.error('无效token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }

    await next()
}

module.exports = {
    auth
}