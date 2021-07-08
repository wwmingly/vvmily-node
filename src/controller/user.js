const { exec } = require("../../db/mysql.js")


const userList = (author, keyword) => {
    let sql = `select * from users where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and content='${keyword}' `
    }
    console.log(sql)
    return exec(sql)
}
// 登录
const checkLogin = (username, password) => {
    let sql = `select * from users where username='${username}' and password='${password}' ;`
    console.log(sql)
    return exec(sql)
}
module.exports = {
    userList, checkLogin
}