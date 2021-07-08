const { userList, checkLogin } = require("../controller/user.js")

const { SuccessModel, ErrorModel } = require("../model/resModel.js")

const handleUserRouter = async (req, res) => {

    const method = req.method
    if (method === "GET" && req.path === "/api/user/list") {
        const { author, keyword } = req.query

        return await userList(author, keyword)
    }
    if (method === "POST" && req.path === "/api/user/login") {
        const { username, password } = req.body
        const result = await checkLogin(username, password)
        return result[0]
    }

}

module.exports = handleUserRouter