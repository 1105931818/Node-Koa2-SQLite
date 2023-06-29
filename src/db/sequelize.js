/* 
    sequelize ORM数据库工具
    ORM：对象关系映射
        数据表映射（对应）一个类
        数据表中的数据行（记录）对应一个对象
        数据表字段对应对象的属性
        数据表的操作对应对象的方法
*/
const { Sequelize } = require('sequelize')

const { SQL_HOST,
        SQL_PORT,
        SQL_USER,
        SQL_PWD,
        SQL_DB } = require('../config/config.default')

const sequelize = new Sequelize(SQL_DB, SQL_USER, SQL_PWD, {
    host: SQL_HOST,
    dialect: 'sqlite'
})

//测试数据库是否连接成功
/* sequelize.authenticate().then(() => {
    console.log('数据库连接成功')
}).catch((err) => {
    console.log(err)
}) */

module.exports = sequelize