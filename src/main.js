const app = require('./app')
const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
    console.log(`服务已启动, http://localhost:${APP_PORT}`)
})