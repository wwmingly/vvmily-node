const mysql = require("mysql")

const { MYYSQL_CONF } = require("../conf/db.js")

const con = mysql.createConnection(MYYSQL_CONF)

// 开始链接数据库
con.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })

}

module.exports = {
    exec
}