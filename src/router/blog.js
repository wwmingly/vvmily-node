const { getList, blogDetail, newBlog, updateBlog, delBlog } = require("../controller/blog.js")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")


const handleBlogRouter = async (req, res) => {
    const method = req.method
    const id = req.query.id
    if (method === "GET" && req.path === "/api/blog/list") {
        const { author, keyword } = req.query
        return await getList(author, keyword)
    }
    if (method === "GET" && req.path === "/api/blog/detail") {
        const detData = await blogDetail(id)
        return detData[0]
    }
    if (method === "POST" && req.path === "/api/blog/new") {
        return await newBlog(req.body)
    }
    if (method === "POST" && req.path === "/api/blog/update") {
        return await updateBlog(id, req.body)
    }
    if (method === "POST" && req.path === "/api/blog/del") {
        return await updateBlog(id, req.body)
    }
    return false

}

module.exports = handleBlogRouter