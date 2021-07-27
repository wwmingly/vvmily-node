const {
  getList,
  blogDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog.js");
const { SuccessModel, ErrorModel } = require("../model/resModel.js");

const handleBlogRouter = async (req, res) => {
  const method = req.method;
  const id = req.query.id;
  if (method === "GET" && req.path === "/api/blog/list") {
    if (!req.session.username) {
      return Promise.resolve(new ErrorModel("尚未登录"));
    }
    const { author, keyword } = req.query;
    const data = await getList(author, keyword);
    return Promise.resolve(new SuccessModel(data, "操作成功"));
  }
  if (method === "GET" && req.path === "/api/blog/detail") {
    if (!req.session.username) {
      return Promise.resolve(new ErrorModel("尚未登录"));
    }
    const detData = await blogDetail(id);
    return Promise.resolve(new SuccessModel(detData[0]));
  }
  if (method === "POST" && req.path === "/api/blog/new") {
    if (!req.session.username) {
      return Promise.resolve(new ErrorModel("尚未登录"));
    }
    return await newBlog(req.body);
  }
  if (method === "POST" && req.path === "/api/blog/update") {
    if (!req.session.username) {
      return Promise.resolve(new ErrorModel("尚未登录"));
    }
    return await updateBlog(id, req.body);
  }
  if (method === "POST" && req.path === "/api/blog/del") {
    if (!req.session.username) {
      return Promise.resolve(new ErrorModel("尚未登录"));
    }
    return await updateBlog(id, req.body);
  }
  return false;
};

module.exports = handleBlogRouter;
