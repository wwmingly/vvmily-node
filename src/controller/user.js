const { exec } = require("../../db/mysql.js");

const userList = (realname, state) => {
  let sql = `select * from users where 1=1 `;
  if (realname) {
    sql += `and realname='${realname}' `;
  }
  if (state) {
    sql += `and state='${state}' `;
  }
  return exec(sql);
};
// 登录
const checkLogin = (username, password) => {
  let sql = `select * from users where username='${username}' and password='${password}' ;`;
  return exec(sql);
};
module.exports = {
  userList,
  checkLogin,
};
