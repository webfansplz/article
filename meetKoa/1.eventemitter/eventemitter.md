### 事件驱动

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

> Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

> Allows you to build scalable network applications usingJavaScript on the server-side.

大多数 Node.js 核心 API 都采用惯用的事件驱动架构，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器）,那么 Node.js 是如何实现事件驱动的呢?

events 模块是 Node.js 实现事件驱动的核心,在 node 中大部分的模块的实现都继承了 Events 类。比如 fs 的 readstream,net 的 server 模块。

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装,EventEmitter 本质上是一个观察者模式的实现。

**koa 实现就继承了 events 类,来监听 error 事件.**

```javascript
const Emitter = require('events');
/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */
class Application extends Emitter {
  constructor() {
    super();
  }
}
const app = new Application();
//  监听error事件
app.on('error', err => {
  console.log('触发了error事件:', err); //  hello koa
});
//  触发error事件
app.emit('error', 'hello koa');
```

[demo 代码](./eventemiiter.js)

这节我们简单了解了 koa 继承类 Emitter 的作用,后面我们会讲到 koa 具体在哪里使用了 events 模块。
