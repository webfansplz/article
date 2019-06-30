## Context 是什么?

> Koa 提供一个 Context 对象，表示一次对话的上下文.

> Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。 这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。

context 对象主要是将上下文的访问器和方法直接委托给它们的 request 对象和 response 对象。其他部分代码做了一些异常错误处理,断言等,这里就不拿出来讲了。

那么,context 对象是怎么进行委托的呢? [解锁新姿势](./delegates.md);

**解锁了新姿势我们再来看以下代码,就能很清楚的了解 koa 是如何 把 ctx 对象接收到的一部分操作委托给了 request 和 response 对象**

```javascript
// koa context.js

/**
 * Response delegation. (响应委托)
 */

delegate(proto, 'response')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable');

/**
 * Request delegation.  (请求委托)
 */

delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('get')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .access('accept')
  .getter('origin')
  .getter('href')
  .getter('subdomains')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('URL')
  .getter('header')
  .getter('headers')
  .getter('secure')
  .getter('stale')
  .getter('fresh')
  .getter('ips')
  .getter('ip');
```
