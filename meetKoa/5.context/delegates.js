const http = require('http');
const delegate = require('delegates');
//request对象
const request = {
  get method() {
    return this.req.method;
  },
  set method(val) {
    this.req.method = val;
  }
};

//context对象
const context = {};

delegate(context, 'request').access('method');

/*  
  将request对象添加到context对象
  将http模块的req(请求信息),res(响应信息)添加到context对象和request对象。
*/
function createContext(req, res) {
  context.request = request;
  context.req = request.req = req;
  context.res = request.res = res;
}
// 创建http服务
http
  .createServer((req, res) => {
    createContext(req, res);
    console.log(context.method); //GET
    context.method = 'POST';
    console.log(context.method); //POST
    res.end('hello node-delegates');
  })
  .listen(3000);
