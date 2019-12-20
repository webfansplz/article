## 压缩 zlib 模块

在流传输过程中，为减少传输数据加快传输速度，往往会对流进行压缩。

HTTP 流就是如此，为提高网站响应速度，会在服务端进行压缩，客户端收到数据后再进行相应的解压。

Node.js 中的 Zlib 模块提供了流压缩与解压缩功能，Zlib 模块提供了对 Gzip/Gunzip、Deflate/Inflate、DeflateRaw/InflateRaw 类的绑定，这些类可以实现对可读流/可写流的压缩与解压。

<!-- 做过 web 性能优化的同学,应该对 gzip 神器很熟悉. -->

### 关于 gzip 与 deflate

deflate(RFC1951)是一种压缩算法，使用 LZ77 和哈弗曼进行编码。gzip(RFC1952)一种压缩格式，是对 deflate 的简单封装，gzip = gzip 头(10 字节) + deflate 编码的实际内容 + gzip 尾(8 字节)。在 HTTP 传输中，gzip 是一种常用的压缩算法，使用 gzip 压缩的 HTTP 数据流，会在 HTTP 头中使用 Content-Encoding：gzip 进行标识。

HTTP Request Header 中 Accept-Encoding 是浏览器发给服务器,声明浏览器支持的解压类型

```js
Accept-Encoding: gzip, deflate, br
```

HTTP Response Header 中 Content-Encoding 是服务器告诉浏览器 使用了哪种压缩类型

```js
Content-Encoding: gzip
```

对 web 性能优化有所了解的同学,相信对 gzip 都不陌生,我们就通过 gzip 来了解 zlib 模块.

### 1. 文件压缩/解压

#### 文件压缩

```js
const zlib = require("zlib");
const fs = require("fs");
const gzip = zlib.createGzip();
const inp = fs.createReadStream("zlib.txt");
const out = fs.createWriteStream("zlib.txt.gz");
inp.pipe(gzip).pipe(out);
```

#### 文件解压

```js
const zlib = require("zlib");
const fs = require("fs");
const gunzip = zlib.createGunzip();
const inp = fs.createReadStream("./un-zlib.txt.gz");
const out = fs.createWriteStream("un-zlib.txt");
inp.pipe(gunzip).pipe(out);
```

### 2. 服务端 gzip 压缩

```js
const fs = require("fs");
const http = require("http");
const zlib = require("zlib");
const filepath = "./index.html";

const server = http.createServer((req, res) => {
  const acceptEncoding = req.headers["accept-encoding"];
  if (acceptEncoding.includes("gzip")) {
    const gzip = zlib.createGzip();
    res.writeHead(200, {
      "Content-Encoding": "gzip"
    });
    fs.createReadStream(filepath)
      .pipe(gzip)
      .pipe(res);
  } else {
    fs.createReadStream(filepath).pipe(res);
  }
});

server.listen(4396);
```
