const env = process.env.NODE_ENV

let MYYSQL_CONF

// 开发环境
if (env === 'dev') {
    MYYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "mynode"
    }
}
// 生产环境，临时配置
if (env === 'production') {
    MYYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "vvmilynode"
    }
}
module.exports = {
    MYYSQL_CONF
}