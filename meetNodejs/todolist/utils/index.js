const fs = require("fs");
const path = require("path");

// 消息响应封装
function responseMsg(
  res,
  body = {},
  code = 200,
  header = { "Content-Type": "application/json; charset=utf-8" }
) {
  res.writeHead(code, header);
  res.end(JSON.stringify(body));
}

// 写入数据
function writeData(res, data) {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, "../data.json"),
      JSON.stringify(data),
      "utf8"
    );
    responseMsg(res, {
      code: 0,
      data: "",
      msg: "success"
    });
  } catch (e) {
    responseMsg(
      res,
      {
        code: 500,
        data: "",
        msg: "server error"
      },
      500
    );
  }
}
// 获取 content-type
function getContentType(key) {
  return {
    png: "image/png",
    js: "application/javascript",
    ico: "image/vnd.microsoft.icon",
    css: "text/css",
    html: "text/html; charset=utf-8"
  }[key];
}
// 注册路由
function register(type, name, handle) {
  Object.assign(this.routes[type], {
    [name]: handle
  });
}

/* 

格式化请求路径及参数

get方法可能携带参数,返回query
delete和put方法以 router.delete('/path/:id'),router.put('/path/:id') 风格注册路由 ,重写路径来匹配对应handle

*/
function formatUrl(method, url) {
  const urlObj = require("url").parse(url);
  if (method === "get") {
    const querystring = require("querystring");
    return {
      url: urlObj.pathname,
      query: querystring.parse(querystring.unescape(urlObj.query))
    };
  } else if (method === "delete" || method === "put") {
    const urlPath = urlObj.pathname.split("/");
    const id = urlPath.length > 2 ? urlPath[urlPath.length - 1] : "";
    return {
      url: id ? [...urlPath.slice(0, urlPath.length - 1), ":id"].join("/") : "",
      query: { id }
    };
  } else {
    return {
      url,
      query: null
    };
  }
}

exports.responseMsg = responseMsg;
exports.writeData = writeData;
exports.getContentType = getContentType;
exports.register = register;
exports.formatUrl = formatUrl;
