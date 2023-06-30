## 项目结构

src
├─ app
│    ├─ errHandler.js 错误信息判定
│    └─ index.js Koa框架
│
├─ config
│    └─ config.default.js dotenv插件，全局环境变量
│
├─ constant 全局常量
│    └─ err.type.js 错误信息
│
├─ controller 接口回调函数
│    └─ user.controller.js 用户模块接口
│
├─ db 数据库管理
│    └─ sequelize.js sequelize ORM数据库工具
│
├─ middleware 路由中间件
│    └─ user.middleware.js 用户模块中间件
│
├─ model 模型层
│    └─ user.model.js 用户表
│
├─ main.js
│
├─ router 路由
│    └─ user.route.js 用户模块
│
└─ service 数据库操作
       └─ user.service 用户模块
