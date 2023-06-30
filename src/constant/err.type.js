module.exports = {
    userFormateError: {
        code: '401',
        message: '用户名、密码、手机号为空',
        data: {}
    },
    userAlreadyExisted: {
        code: '409',
        message: '用户名已存在',
        data: {}
    },
    userRegisterError: {
        code: '403',
        message: '注册失败',
        data: {}
    },
    loginFormateError: {
        code: '401',
        message: '登录账号、密码为空',
        data: {}
    },
    loginRegisterError: {
        code: '403',
        message: '查找账号失败',
        data: {}
    },
    userDoesNotExist: {
        code: '404',
        message: '该账号未注册',
        data: {}
    },
    invalidPassword: {
        code: '401',
        message: '密码错误',
        data: {}
    },
    loginFailed: {
        code: '403',
        message: '登录失败',
        data: {}
    },
    tokenError: {
        code: '401',
        message: 'token过期',
        data: {}
    },
    invalidToken: {
        code: '401',
        message: '无效token',
        data: {}
    },
    pwdError: {
        code: '401',
        message: '密码不能为空',
        data: {}
    },
    pwdFailed: {
        code: '403',
        message: '修改的密码与旧密码相同',
        data: {}
    },
    invalidPwd: {
        code: '409',
        message: '密码修改失败',
        data: {}
    }
}
