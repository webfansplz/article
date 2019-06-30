## Koa 中间件

[Koa 生态](https://github.com/koajs)提供了各种各样的中间件供我们使用,可插可拔,非常灵活,开发者也可以根据自己的需求开发中间件。

Koa 本身只是实现了中间件流程控制,就能让我们在 Koa 中简单的使用中间件,那么它是怎么实现的呢?

本节我们先说说 Koa 的 use 方法做了什么,下一节我们将对 Koa 精妙的中间件流程控制作重点分析～

```javascript
const Emitter = require('events');
const http = require('http');
//  将Generator函数 转化为 使用co包装成的Promise对象
const convert = require('koa-convert');
//  控制输出弃用功能警告日志
const deprecate = require('depd')('koa');
//  是否是Generator函数
const isGeneratorFunction = require('is-generator-function');
class Application extends Emitter {
  constructor() {
    super();
    //装载中间件容器
    this.middleware = [];
  }
  listen(...args) {
    const server = http.createServer(this.callback);
    return server.listen(...args);
  }
  callback(request, response) {
    response.end('hello koa');
  }
  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */

  use(fn) {
    //  参数类型非函数时,抛出类型错误异常.
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    //中间件如果是Generator函数
    if (isGeneratorFunction(fn)) {
      // 抛出弃用警告,对生成器的支持将在v3中移除。
      deprecate(
        'Support for generators will be removed in v3. ' +
          'See the documentation for examples of how to convert old middleware ' +
          'https://github.com/koajs/koa/blob/master/docs/migration.md'
      );
      // (因为koa1使用的是Generator函数, koa2使用的是async函数, 所以做了此处理)
      fn = convert(fn);
    }
    //往中间件容器添加中间件
    this.middleware.push(fn);
    //返回当前实例,支持链式调用中间件
    return this;
  }
}

const app = new Application();
app
  .use(() => {
    console.log('hi');
  })
  .use(() => {
    console.log('koa');
  })
  .use(() => {
    console.log('middleware');
  });
console.log(app.middleware);
app.listen(1234, () => {
  console.log('koa app listen on 1234');
});
```

[demo 代码](./3.use-middleware.js)
