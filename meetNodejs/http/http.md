## http 模块

> http 模块是 Node.js 中非常重要的一个核心模块。通过 http 模块，你可以使用其 http.createServer 方法创建一个 http 服务器，也可以使用其 http.request 方法创建一个 http 客户端。(本文先不说),Node 对 HTTP 协议及相关 API 的封装比较底层，其仅能处理流和消息，对于消息的处理，也仅解析成报文头和报文体，但是不解析实际的报文头和报文体内容。这样不仅解决了 HTTP 原本比较难用的特性，也可以支持更多的 HTTP 应用.

### http.IncomingMessage 对象

IncomingMessage 对象是由 http.Server 或 http.ClientRequest 创建的，并作为第一参数分别传递给 http.Server 的'request'事件和 http.ClientRequest 的'response'事件。

它也可以用来访问应答的状态、头文件和数据等。 IncomingMessage 对象实现了 Readable Stream 接口，对象中还有一些事件，方法和属性。

在 http.Server 或 http.ClientRequest 中略有不同。

### http.createServer([requestListener])创建 HTTP 服务器

实现 HTTP 服务端功能，要通过 http.createServer 方法创建一个服务端对象 http.Server。

这个方法接收一个可选传入参数 requestListener，该参数是一个函数，传入后将做为 http.Server 的 request 事件监听。不传入时，则需要通过在 http.Server 对象的 request 事件中单独添加。

```js
var http = require("http");

// 创建server对象，并添加request事件监听器
var server = http.createServer(function(req, res) {
  res.writeHeader(200, { "Content-Type": "text/plain" });
  res.end("Hello Nodejs");
});

// 创建server对象，通过server对象的request事件添加事件事件监听器
var server = new http.Server();
server.on("request", function(req, res) {
  res.writeHeader(200, { "Content-Type": "text/plain" });
  res.end("Hello Nodejs");
});
```

### http.Server 服务器对象

http.Server 对象是一个事件发射器 EventEmitter，会发射：request、connection、close、checkContinue、connect、upgrade、clientError 事件。

其中 request 事件监听函数为 function (request, response) { }，该方法有两个参数：request 是一个 http.IncomingMessage 实例，response 是一个 http.ServerResponse 实例。

http.Server 对象中还有一些方法，调用 server.listen 后 http.Server 就可以接收客户端传入连接。

### http.ServerResponse

http.ServerResponse 对象用于响应处理客户端请求。

http.ServerResponse 是 HTTP 服务器（http.Server）内部创建的对象，作为第二个参数传递给 'request'事件的监听函数。

http.ServerResponse 实现了 Writable Stream 接口，其对于客户端的响应，本质上是对这个可写流的操作。它还是一个 EventEmitter，包含：close、finish 事件。

### 创建一个 http.Server

创建 http.Server 使用 http.createServer()方法，为了处理客户端请求，需要在服务端监听来自客户的'request'事件。

'request'事件的回调函数中，会返回一个 http.IncomingMessage 实例和一个 http.ServerResponse。

```js
const http = require("http");
/**
 * @param {Object} req 是一个http.IncomingMessag实例
 * @param {Object} res 是一个http.ServerResponse实例
 */
const server = http.createServer((req, res) => {
  console.log(req.headers);
  res.end(`Hello Nodejs`);
});

server.listen(3000);
```

http.ServerResponse 实例是一个可写流，所以可以将一个文件流转接到 res 响应流中。下面示例就是将一张图片流传送到 HTTP 响应中：

```js
const http = require("http");
/**
 * @param {Object} req 是一个http.IncomingMessag实例
 * @param {Object} res 是一个http.ServerResponse实例
 */
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "image/jpg" });
  const r = require("fs").createReadStream("./kobe.jpg");
  r.pipe(res);
});

server.listen(3000);
```
