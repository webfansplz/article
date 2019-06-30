const Emitter = require('events');
const http = require('http');

class Application extends Emitter {
  constructor() {
    super();
  }
  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */
  listen(...args) {
    //创建http服务,接收一个回调函数
    const server = http.createServer(this.callback);
    return server.listen(...args);
  }
  //接收两个参数request和response,分别表示请求和响应的信息。
  callback(request, response) {
    //设置响应信息
    response.end('hello koa');
  }
}

const app = new Application();
//创建http服务器,监听1234端口
app.listen(1234, () => {
  console.log('koa app listen on 1234');
});

//  打开浏览器,输入localhost:1234 or 127.0.0.1:1234 ,就可以看到hello koa
