const { userList, checkLogin } = require("../controller/user.js");

const { SuccessModel, ErrorModel } = require("../model/resModel.js");

const handleUserRouter = async (req, res) => {
  const method = req.method;
  if (method === "GET" && req.path === "/api/user/list") {
    const { realname, state } = req.query;

    return await userList(realname, state);
  }
  if (method === "POST" && req.path === "/api/user/login") {
    // const { username, password } = req.query;
    const { username, password } = req.body;
    const result = await checkLogin(username, password);
    const data = result[0];
    if (data.username) {
      req.session.username = data.username;
    }

    return data;
  }
};

module.exports = handleUserRouter;
