## 事件触发器 events 模块

> Node.js 使用了一个**事件驱动**、非阻塞式 I/O 的模型，使其轻量又高效。

大多数 Node.js 核心 API 都采用惯用的事件驱动架构，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器）,那么 Node.js 是如何实现事件驱动的呢?

events 模块是 Node.js 实现事件驱动的核心,在 node 中大部分的模块的实现都继承了 Events 类。比如 fs 的 readstream,net 的 server 模块。

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装,EventEmitter 本质上是一个**观察者模式**的实现。

所有能触发事件的对象都是 EventEmitter 类的实例。 这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上。 事件的命名通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性键。

EventEmitter 对象使用 eventEmitter.emit()触发事件,当 EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。 被调用的监听器返回的任何值都将会被忽略并丢弃。

下面我们通过几个简单的例子来学习 events 模块

### 1. 基础例子

注册 Application 实例,继承 EventEmitter 类,通过继承而来的 eventEmitter.on() 函数监听事件,eventEmitter.emit()触发事件

```js
const EventEmitter = require("events");
/**
 * Expose `Application` class.
 * Inherits from `EventEmitter.prototype`.
 */
class Application extends EventEmitter {}
const app = new Application();
//  监听hello事件
app.on("hello", data => {
  console.log(data); // hello nodeJs
});
//  触发hello事件
app.emit("hello", "hello nodeJs");
```

### 2. 多个事件监听器及 this 指向

绑定多个事件监听器时,事件监听器按照注册的顺序执行。

当监听器函数被调用时， this 关键词会被指向监听器所绑定的 EventEmitter 实例。也可以使用 ES6 的箭头函数作为监听器,但 this 关键词不会指向 EventEmitter 实例。

```js
const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();
//  监听play事件
mrNull.on("play", function(data) {
  console.log(this);
  // Person {
  //   _events:
  //   [Object: null prototype] { play: [[Function], [Function]] },
  //   _eventsCount: 1,
  //     _maxListeners: undefined
  // }
  console.log(`play`);
});
//  监听play事件
mrNull.on("play", data => {
  console.log(this); // {}
  console.log(`play again`);
});
//  触发play事件
mrNull.emit("play", "hello nodeJs");
```

### 3. 同步 VS 异步

EventEmitter 以注册的顺序同步地调用所有监听器。

```js
const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();
mrNull.on("play", function(data) {
  console.log(data);
});

mrNull.emit("play", "hello nodeJs");

console.log(`hello MrNull`);

// hello nodeJs
// hello MrNull
```

监听器函数可以使用 setImmediate() 和 process.nextTick() 方法切换到异步的操作模式

```js
const developer = new Person();
developer.on("dev", function(data) {
  setImmediate(() => {
    console.log(data);
  });
});
developer.on("dev", function(data) {
  process.nextTick(() => {
    console.log(data);
  });
});
developer.emit("dev", "hello nodeJs");

console.log(`hello developer`);

// hello developer
// hello nodeJs
// hello nodeJs
```

### 4. 只调用一次的事件监听器

使用 eventEmitter.once() 可以注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用。

```js
const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();
mrNull.once("play", () => {
  console.log("play !");
});

mrNull.emit("play");
mrNull.emit("play");

// play ! 只输出一次
```

### 5. 事件触发顺序

在注册事件前,触发该事件,不会被触发 !!

```js
const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();

mrNull.emit("play");

mrNull.on("play", () => {
  console.log("play !");
});

// 无任何输出
```

### 6. 移除事件监听器

```js
const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();

function play() {
  console.log("play !");
}
mrNull.on("play", play);

mrNull.emit("play");

// mrNull.off("play", play); v10.0.0版本新增,emitter.removeListener() 的别名。
//  or
mrNull.removeListener("play", play);

mrNull.emit("play");

// play !  移除后不再触发
```
