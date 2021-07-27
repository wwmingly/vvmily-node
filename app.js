const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const { SuccessModel, ErrorModel } = require("./src/model/resModel.js");
let SESSION_DATA = {};
let needSetCookie = false;
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 1 * 60 * 60 * 1000); // 一个小时
  return d.toGMTString();
};
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    // if (req.headers['Content-type'] !== 'application/json') {
    //     resolve({})
    //     return
    // }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");
  const url = req.url;
  req.path = url.split("?")[0];
  // 参数解析
  req.query = querystring.parse(url.split("?")[1]);
  //   cookie 整理
  req.cookie = {};
  let cookieStr = req.headers.cookie || "";
  if (cookieStr) {
    cookieStr.split(";").forEach((item) => {
      let arr = item.split("=");
      let key = arr[0].trim();
      let val = arr[1].trim();
      req.cookie[key] = val;
    });
  }
  let userId = req.cookie.userid;
  if (userId) {
    needSetCookie = false;
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA;
  getPostData(req).then(async (postData) => {
    req.body = postData;
    try {
      let blogData = await handleBlogRouter(req, res);
      if (blogData) {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(blogData));
        return;
      }
      let userData = await handleUserRouter(req, res);
      if (userData) {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(new SuccessModel(userData, "操作成功")));
        return;
      }
    } catch {
      res.end(JSON.stringify(new ErrorModel("操作失败")));
    }
    // res.writeHead(404, { "Content-type": "text/plain" })
    // res.write("404 not found")
    res.end(JSON.stringify(new ErrorModel("404 NOT FOUND")));
  });
};

module.exports = serverHandle;
