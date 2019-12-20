## 流 stream 模块

流（stream）是 Node.js 中处理流式数据的抽象接口。 stream 模块用于构建实现了流接口的对象。

Node.js 提供了多种流对象。 例如，HTTP 服务器的请求和 process.stdout 都是流的实例。

流可以是可读的、可写的、或者可读可写的。 所有的流都是 EventEmitter 的实例。

尽管理解流的工作方式很重要，但是 stream 模块主要用于开发者创建新类型的流实例。 对于以消费流对象为主的开发者，极少需要直接使用 stream 模块。

### stream 类型

Node.js 中有四种基本的流类型:

- Writable - 可写入数据的流（例如 fs.createWriteStream()）。

- Readable - 可读取数据的流（例如 fs.createReadStream()）。

- Duplex - 可读又可写的流（例如 net.Socket）。

- Transform - 在读写过程中可以修改或转换数据的 Duplex 流（例如 zlib.createDeflate()）。

### 用于消费流的 API

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // req 是一个 http.IncomingMessage 实例，它是可读流。
  // res 是一个 http.ServerResponse 实例，它是可写流。

  let body = "";
  // 接收数据为 utf8 字符串，
  // 如果没有设置字符编码，则会接收到 Buffer 对象。
  req.setEncoding("utf8");

  // 如果添加了监听器，则可读流会触发 'data' 事件。
  req.on("data", chunk => {
    body += chunk;
  });

  // 'end' 事件表明整个请求体已被接收。
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      // 响应信息给用户。
      res.write(typeof data);
      res.end();
    } catch (er) {
      // json 解析失败。
      res.statusCode = 400;
      return res.end(`错误: ${er.message}`);
    }
  });
});

server.listen(1337);

// curl localhost:1337 -d "{}"
// object
// curl localhost:1337 -d "\"foo\""
// string
// curl localhost:1337 -d "not json"
// 错误: Unexpected token o in JSON at position 1
```

当数据可以从流读取时，可读流会使用 EventEmitter API 来通知应用程序 (比如例子中的 req data 事件)。 从流读取数据的方式有很多种。

可写流（比如例子中的 res）会暴露了一些方法，比如 write() 和 end() 用于写入数据到流。

可写流和可读流都通过多种方式使用 EventEmitter API 来通讯流的当前状态。Duplex 流和 Transform 流都是可写又可读的。

对于只需写入数据到流或从流消费数据的应用程序，并不需要直接实现流的接口，通常也不需要调用 require('stream')。

对于大部分的 nodejs 开发者来说，平常并不会直接用到 stream 模块,但是理解 stream 流的运行机制却是尤其重要的.
