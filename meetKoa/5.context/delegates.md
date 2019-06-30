## node-delegates

> node-delegates 是 TJ 大神撸的一个工具,作用是将一个对象接收到的操作委托给它的内部属性进行处理.

这里我们就不对[node-delegates](https://github.com/tj/node-delegates)的源码进行分析了,我们来简单看一下 koa 用到的几个 api。

#### Delegate(proto,prop)

创建一个 delegator 实例,并把 proto 接收到的一些操作委托给它的 prop 属性进行处理。

#### Delegate.prototype.method(name)

在 proto 对象上新增一个名为 name 的函数,调用该函数相当于调用 proto 的 prop 属性上的 name 函数。

#### Delegate.prototype.getter(name)

新增一个 getter 到 proto 对象，访问该 getter 即可访问 proto 的 prop 的对应 getter。

#### Delegate.prototype.access(name)

在 proto 上同时新增一个 getter 和一个 setter，指向 proto.prop 的对应属性。

**下面我们简易实现来加深一下理解**

```javascript
const http = require('http');
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
    console.log(context.method); //  undefined
    console.log(context.request.method); // GET
    res.end('hello node-delegates');
  })
  .listen(3000);
```

可以看到,目前我们直接访问 context.method 是 undefined(废话,能访问得到才有鬼),接下来我们来把 method 委托给 request 对象。

```javascript
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
    console.log(context.method); //  GET
    console.log(context.request.method); //  GET
    res.end('hello node-delegates');
  })
  .listen(3000);
```

完美,成功访问到 context.method,可以看到我们是使用 access 方法来代理 method 属性到 request 对象,我们来试试是不是可以设置 method ～

```javascript
http
  .createServer((req, res) => {
    createContext(req, res);
    console.log(context.method); // GET
    context.method = 'POST';
    console.log(context.method); // POST
    res.end('hello node-delegates');
  })
  .listen(3000);
```

可以看到 method 被成功 set 为 post ～如果是使用 getter 方法来代理的话,就代表只读,童鞋们可以自己尝试一波～

[demo 代码](./delegates.js)
