
const querystring = require("querystring")

const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const { SuccessModel, ErrorModel } = require("./src/model/resModel.js")
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({})
            return
        }

        // if (req.headers['Content-type'] !== 'application/json') {
        //     resolve({})
        //     return
        // }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on("end", () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}

const serverHandle = (req, res) => {

    res.setHeader("Content-type", "application/json")
    const url = req.url
    req.path = url.split("?")[0]
    // 参数解析
    req.query = querystring.parse(url.split("?")[1])
    getPostData(req).then(async postData => {
        req.body = postData
        try {
            let blogData = await handleBlogRouter(req, res)
            if (blogData) {
                res.end(JSON.stringify(new SuccessModel(blogData, '操作成功')))
                return
            }
            let userData = await handleUserRouter(req, res)
            if (userData) {
                res.end(JSON.stringify(new SuccessModel(userData, '操作成功')))
                return
            }
        } catch {
            res.end(JSON.stringify(new ErrorModel("操作失败")))
        }
        // res.writeHead(404, { "Content-type": "text/plain" })
        // res.write("404 not found")
        res.end(JSON.stringify(new ErrorModel("404 NOT FOUND")))
    })

}


module.exports = serverHandle