const { DataTypes } = require('sequelize')

const sequelize = require('../db/sequelize')

//创建模型  模型对应数据表
const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名'
    },
    password: {
        type: DataTypes.CHAR(24),
        allowNull: false,
        comment: '密码'
    },
    phone: {
        type: DataTypes.NUMBER(11),
        allowNull: false,
        comment: '联系电话'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员'
    }
}, {
    tableName: 'user',
    timestamps: false
})

//强制同步数据库（创建数据表）
User.sync()

module.exports = User