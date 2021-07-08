const { exec } = require("../../db/mysql.js")


// 博客列表
const getList = (author, keyword) => {
    let sql = `select * from bloglist where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    // select * from users where username like '%zhang%';
    if (keyword) {
        sql += `and content like '%${keyword}%' `
    }
    return exec(sql)

}
// 获取博客详情
const blogDetail = (id) => {
    let sql = `select * from bloglist where id='${id}' `
    return exec(sql)
}
// 新增博客
const newBlog = (postData = {}) => {
    let { title, content } = postData
    let createtime = Date.now(), author = '王五'
    let sql = `insert into bloglist(title,content,createtime,author) values('${title
        }','${content}','${createtime}','${author}');`
    return exec(sql)
}
// 更新博客
const updateBlog = (id, postData = {}) => {
    let { title, content } = postData
    let sql = `update bloglist set ${title ? "title='" + title + "'," : ''}${content ? "content='" + content + "'" : ""} where id = ${id};`
    return exec(sql)
}
// 删除博客
const delBlog = (id, postData) => {
    let { author } = postData
    let sql = `delete from bloglist where id=${id} and author='${author}';`
    return exec(sql)
}
module.exports = {
    getList, blogDetail, newBlog, updateBlog, delBlog
}