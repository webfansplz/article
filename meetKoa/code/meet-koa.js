const Emitter = require('events');

// console.log(Emitter);

//大多数 Node.js 核心 API 都采用惯用的异步事件驱动架构，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器）。
// 这里继承了node的事件模块events ,(https://github.com/nodejs/node/blob/master/lib/events.js)
// events 模块只提供了一个对象： events.EventEmitter。
// EventEmitter 提供了四个API,(on,emit,once,off),用过vue的你是不是觉得有点眼熟呢？
//EventEmitter 的核心就是事件触发与事件监听器功能的封装,EventEmitter本质上是一个观察者模式的实现。
//这里不对EventEmitter做太多详细的介绍,有兴趣的童鞋可以找一下相关资料.

//在koa中也需要监听某些事件,来触发对应的回调函数.例:

// app.on('error', err => {
//   log.error('server error', err)
// });

class Application extends Emitter {
  constructor() {
    super();
  }
}
const app = new Application();

app.on('error', err => {
  console.log('触发了error事件！', err);
});

app.emit('error', 'holy shit');
app.emit('error', 'holy shit again');
