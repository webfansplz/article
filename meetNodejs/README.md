# meet-nodejs

本文通过了解 Node.js 13 个 基础核心模块 和 一个基于 原生 Node.js 的 TodoList 实践 ,带你上手 Node.js

## 13 个基础核心模块

[ 1. 事件触发器 events 模块](#1)

[ 2. 本地路径 path 模块](#2)

[ 3. 文件操作系统 fs 模块](#3)

[ 4. 全局对象 process 进程](#4)

[ 5. http 模块](#5)

[ 6. 统一资源定位符 url 模块](#6)

[ 7. 压缩 zlib 模块](#7)

[ 8. 流 stream 模块](#8)

[ 9. 逐行读取 readline 模块](#9)

[ 10. 查询字符串 querystring 模块](#10)

[ 11. module 模块](#11)

[ 12. 缓冲器 Buffer 模块](#12)

[ 13. 域名服务器 dns 模块](#13)

Node.js 内置模块远不止 13 个,入门阶段我们先了解一些常用的基础核心模块.

## TodoList 做了什么?

为了对 Node.js 核心模块进一步加深理解,这个 demo 采用原生 api 实现,脱离 express,koa 等一些 web 框架和库 。

- RESTful API 实践

- 静态资源映射及 gzip 压缩

- 后端路由 Router 简易实现

- Node.js 核心模块方法实践

<h2 id="1"> 1. 事件触发器 events 模块</h2>

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
const EventEmitter = require('events')
/**
 * Expose `Application` class.
 * Inherits from `EventEmitter.prototype`.
 */
class Application extends EventEmitter {}
const app = new Application()
//  监听hello事件
app.on('hello', data => {
  console.log(data) // hello nodeJs
})
//  触发hello事件
app.emit('hello', 'hello nodeJs')
```

### 2. 多个事件监听器及 this 指向

绑定多个事件监听器时,事件监听器按照注册的顺序执行。

当监听器函数被调用时， this 关键词会被指向监听器所绑定的 EventEmitter 实例。也可以使用 ES6 的箭头函数作为监听器,但 this 关键词不会指向 EventEmitter 实例。

```js
const EventEmitter = require('events')

class Person extends EventEmitter {
  constructor() {
    super()
  }
}
const mrNull = new Person()
//  监听play事件
mrNull.on('play', function(data) {
  console.log(this)
  // Person {
  //   _events:
  //   [Object: null prototype] { play: [[Function], [Function]] },
  //   _eventsCount: 1,
  //     _maxListeners: undefined
  // }
  console.log(`play`)
})
//  监听play事件
mrNull.on('play', data => {
  console.log(this) // {}
  console.log(`play again`)
})
//  触发play事件
mrNull.emit('play', 'hello nodeJs')
```

### 3. 同步 VS 异步

EventEmitter 以注册的顺序同步地调用所有监听器。

```js
const EventEmitter = require('events')

class Person extends EventEmitter {
  constructor() {
    super()
  }
}
const mrNull = new Person()
mrNull.on('play', function(data) {
  console.log(data)
})

mrNull.emit('play', 'hello nodeJs')

console.log(`hello MrNull`)

// hello nodeJs
// hello MrNull
```

监听器函数可以使用 setImmediate() 和 process.nextTick() 方法切换到异步的操作模式

```js
const developer = new Person()
developer.on('dev', function(data) {
  setImmediate(() => {
    console.log(data)
  })
})
developer.on('dev', function(data) {
  process.nextTick(() => {
    console.log(data)
  })
})
developer.emit('dev', 'hello nodeJs')

console.log(`hello developer`)

// hello developer
// hello nodeJs
// hello nodeJs
```

### 4. 只调用一次的事件监听器

使用 eventEmitter.once() 可以注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用。

```js
const EventEmitter = require('events')

class Person extends EventEmitter {
  constructor() {
    super()
  }
}
const mrNull = new Person()
mrNull.once('play', () => {
  console.log('play !')
})

mrNull.emit('play')
mrNull.emit('play')

// play ! 只输出一次
```

### 5. 事件触发顺序

在注册事件前,触发该事件,不会被触发 !!

```js
const EventEmitter = require('events')

class Person extends EventEmitter {
  constructor() {
    super()
  }
}
const mrNull = new Person()

mrNull.emit('play')

mrNull.on('play', () => {
  console.log('play !')
})

// 无任何输出
```

### 6. 移除事件监听器

```js
const EventEmitter = require('events')

class Person extends EventEmitter {
  constructor() {
    super()
  }
}
const mrNull = new Person()

function play() {
  console.log('play !')
}
mrNull.on('play', play)

mrNull.emit('play')

// mrNull.off("play", play); v10.0.0版本新增,emitter.removeListener() 的别名。
//  or
mrNull.removeListener('play', play)

mrNull.emit('play')

// play !  移除后不再触发
```

<h2 id="2"> 2. 本地路径 path 模块</h2>

Node.js 提供了 path 模块,用于处理文件路径和目录路径 . 不同操作系统 表现有所差异 !

### 1. 获取路径的目录名

```js
const path = require('path')

path.dirname('/path/example/index.js') // /path/example
```

### 2. 获取路径的扩展名

```js
const path = require('path')

path.extname('/path/example/index.js') // .js
```

### 3. 是否是绝对路径

```js
const path = require('path')

path.isAbsolute('/path/example/index.js') // true

path.isAbsolute('.') // false
```

### 4. 拼接路径片段

```js
path.join('/path', 'example', './index.js') // /path/example/index.js
```

### 5. 将路径或路径片段的序列解析为绝对路径。

```js
path.resolve('/foo/bar', './baz')
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/')
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

### 6. 规范化路径

```js
path.normalize('/path///example/index.js') //  /path/example/index.js
```

### 7. 解析路径

```js
path.parse('/path/example/index.js')

/*
 { root: '/',
  dir: '/path/example',
  base: 'index.js',
  ext: '.js',
  name: 'index' }
*/
```

### 8. 序列化路径

```js
path.format({
  root: '/',
  dir: '/path/example',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}) // /path/example/index.js
```

### 9. 获取 from 到 to 的相对路径

```js
path.relative('/path/example/index.js', '/path') // ../..
```

<h2 id="3">3 .文件操作系统 fs 模块</h2>

> 在一些场景下,我们需要对文件进行 增删改查等操作, Nodejs 提供了 fs 模块,让我们对文件进行操作.

下面我们来介绍几个经常用的 API

### 1. 读取文件

```js
const fs = require('fs')
const fs = require('fs')

// 异步读取
fs.readFile('./index.txt', 'utf8', (err, data) => {
  console.log(data) //  Hello Nodejs
})

// 同步读取
const data = fs.readFileSync('./index.txt', 'utf8')

console.log(data) //  Hello Nodejs

// 创建读取流
const stream = fs.createReadStream('./index.txt', 'utf8')

// 这里可以看到fs.createReadStream用到了我们前面介绍的events eventEmitter.on() 方法来监听事件
stream.on('data', data => {
  console.log(data) // Hello Nodejs
})
```

### 2. 写入/修改文件

写入文件时,如果文件不存在,则会创建并写入,如果文件存在,会覆盖文件内容.

```js
const fs = require('fs')
// 异步写入
fs.writeFile('./write.txt', 'Hello Nodejs', 'utf8', err => {
  if (err) throw err
})
// 同步写入
fs.writeFileSync('./writeSync.txt', 'Hello Nodejs')
// 文件流写入
const ws = fs.createWriteStream('./writeStream.txt', 'utf8')
ws.write('Hello Nodejs')
ws.end()
```

### 3. 删除文件/文件夹

- 删除文件

```js
// 异步删除文件
fs.unlink('./delete.txt', err => {
  if (err) throw err
})

// 同步删除文件
fs.unlinkSync('./deleteSync.txt')
```

- 删除文件夹

```js
// 异步删除文件夹
fs.rmdir('./rmdir', err => {
  if (err) throw err
})

// 同步删除文件夹
fs.rmdirSync('./rmdirSync')
```

### 4. 创建文件夹

```js
// 异步创建文件夹
fs.mkdir('./mkdir', err => {
  if (err) throw err
})

// 同步创建文件夹
fs.mkdirSync('./mkdirSync')
```

### 5. 重命名文件/文件夹

```js
const fs = require('fs')

// 异步重命名文件
fs.rename('./rename.txt', './rename-r.txt', err => {
  if (err) throw err
})

// 同步重命名文件夹
fs.renameSync('./renameSync', './renameSync-r')
```

### 6. 复制文件/文件夹

```js
const fs = require('fs')

// 异步复制文件
fs.copyFile('./copy.txt', './copy-c.txt', (err, copyFiles) => {
  if (err) throw err
})

// 同步复制文件夹
fs.copyFileSync('./null', 'null-c')
```

### 7. 文件夹状态- 文件/文件夹

```js
const fs = require('fs')

// 异步获取文件状态
fs.stat('./dir', (err, stats) => {
  if (err) throw err
  // 是否是文件类型
  console.log(stats.isFile()) // false
  // 是否是文件夹类型
  console.log(stats.isDirectory()) // true
})

// 同步获取文件状态
const stats = fs.statSync('./stats.txt')

// 是否是文件类型
console.log(stats.isFile()) // true
// 是否是文件夹类型
console.log(stats.isDirectory()) // false
```

**在一些复杂的操作场景下,fs 模块要做很多判断与处理 ,这里我推荐大家使用 [fs-extra](https://github.com/jprichardson/node-fs-extra),它在 fs 的基础上扩展了一些方法,让一些复杂操作更简便!**

<h2 id="4">4. 全局对象 process 进程</h2>

> process 对象是一个 Global 全局对象，你可以在任何地方使用它，而无需 require。process 是 EventEmitter 的一个实例，所以 process 中也有相关事件的监听。使用 process 对象，可以方便处理进程相关操作。

### process 常用属性

#### 进程命令行参数: process.argv

process.argv 是一个当前执行进程折参数组，第一个参数是 node，第二个参数是当前执行的.js 文件名，之后是执行时设置的参数列表。

```js
node index.js --tips="hello nodejs"

/*
[ '/usr/local/bin/node',
  'xxx/process/index.js',
  '--tips=hello nodejs' ]
*/
```

#### Node 的命令行参数数组：process.execArgv

process.execArgv 属性会返回 Node 的命令行参数数组。

```js
node --harmony index.js --version

console.log(process.execArgv);  // [ '--harmony' ]

console.log(process.argv);

/*
[ '/usr/local/bin/node',
  'xxx/process/index.js',
  '--version' ]
*/

```

#### Node 编译时的版本: process.version

process.version 属性会返回 Node 编译时的版本号，版本号保存于 Node 的内置变量 NODE_VERSION 中。

```js
console.log(process.version) // v10.15.3
```

#### 当前进程的 PID process.pid

process.pid 属性会返回当前进程的 PID。

```js
console.log('process PID: %d', process.pid)

//process PID: 10086
```

### process 常用方法

#### 当前工作目录 process.cwd()

process.cwd()方法返回进程当前的工作目录

```js
console.log(process.cwd()) // /Users/null/nodejs/process
```

#### 终止当前进程：process.exit([code])

process.exit()方法终止当前进程，此方法可接收一个退出状态的可选参数 code，不传入时，会返回表示成功的状态码 0。

```js
process.on('exit', function(code) {
  console.log('进程退出码是:%d', code) // 进程退出码是:886
})

process.exit(886)
```

#### nodejs 微任务: process.nextTick()

process.nextTick()方法用于延迟回调函数的执行， nextTick 方法会将 callback 中的回调函数延迟到事件循环的下一次循环中，与 setTimeout(fn, 0)相比 nextTick 方法效率高很多，该方法能在任何 I/O 之前调用我们的回调函数。

```js
console.log('start')
process.nextTick(() => {
  console.log('nextTick cb')
})
console.log('end')

// start
// end
// nextTick cb
```

### process 标准流对象

process 中有三个标准备流的操作，与 其他 streams 流操作不同的是，process 中流操作是同步写,阻塞的。

#### 标准错误流: process.stderr

process.stderr 是一个指向标准错误流的可写流 Writable Stream。console.error 就是通过 process.stderr 实现的。

#### 标准输入流：process.stdin

process.stdin 是一个指向标准输入流的可读流 Readable Stream。

```js
process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  let chunk
  // 使用循环确保我们读取所有的可用数据。
  while ((chunk = process.stdin.read()) !== null) {
    if (chunk === '\n') {
      process.stdin.emit('end')
      return
    }
    process.stdout.write(`收到数据: ${chunk}`)
  }
})

process.stdin.on('end', () => {
  process.stdout.write('结束监听')
})
```

![process-stdin](https://raw.githubusercontent.com/webfansplz/article/master/meetNodejs/process/process-stdin.gif)

#### 标准输出流：process.stdout

process.stdout 是一个指向标准输出流的可写流 Writable Stream。console.log 就是通过 process.stdout 实现的

```js
console.log = function(d) {
  process.stdout.write(d + '\n')
}

console.log('Hello Nodejs') // Hello Nodejs
```

<h2 id="5">5. http 模块</h2>

> http 模块是 Node.js 中非常重要的一个核心模块。通过 http 模块，你可以使用其 http.createServer 方法创建一个 http 服务器，也可以使用其 http.request 方法创建一个 http 客户端。(本文先不说),Node 对 HTTP 协议及相关 API 的封装比较底层，其仅能处理流和消息，对于消息的处理，也仅解析成报文头和报文体，但是不解析实际的报文头和报文体内容。这样不仅解决了 HTTP 原本比较难用的特性，也可以支持更多的 HTTP 应用.

### http.IncomingMessage 对象

IncomingMessage 对象是由 http.Server 或 http.ClientRequest 创建的，并作为第一参数分别传递给 http.Server 的'request'事件和 http.ClientRequest 的'response'事件。

它也可以用来访问应答的状态、头文件和数据等。 IncomingMessage 对象实现了 Readable Stream 接口，对象中还有一些事件，方法和属性。

在 http.Server 或 http.ClientRequest 中略有不同。

### http.createServer([requestListener])创建 HTTP 服务器

实现 HTTP 服务端功能，要通过 http.createServer 方法创建一个服务端对象 http.Server。

这个方法接收一个可选传入参数 requestListener，该参数是一个函数，传入后将做为 http.Server 的 request 事件监听。不传入时，则需要通过在 http.Server 对象的 request 事件中单独添加。

```js
var http = require('http')

// 创建server对象，并添加request事件监听器
var server = http.createServer(function(req, res) {
  res.writeHeader(200, { 'Content-Type': 'text/plain' })
  res.end('Hello Nodejs')
})

// 创建server对象，通过server对象的request事件添加事件事件监听器
var server = new http.Server()
server.on('request', function(req, res) {
  res.writeHeader(200, { 'Content-Type': 'text/plain' })
  res.end('Hello Nodejs')
})
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
const http = require('http')
/**
 * @param {Object} req 是一个http.IncomingMessag实例
 * @param {Object} res 是一个http.ServerResponse实例
 */
const server = http.createServer((req, res) => {
  console.log(req.headers)
  res.end(`Hello Nodejs`)
})

server.listen(3000)
```

http.ServerResponse 实例是一个可写流，所以可以将一个文件流转接到 res 响应流中。下面示例就是将一张图片流传送到 HTTP 响应中：

```js
const http = require('http')
/**
 * @param {Object} req 是一个http.IncomingMessag实例
 * @param {Object} res 是一个http.ServerResponse实例
 */
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/jpg' })
  const r = require('fs').createReadStream('./kobe.jpg')
  r.pipe(res)
})

server.listen(3000)
```

<h2 id="6">6. 统一资源定位符 url 模块</h2>

Node.js 提供了 url 模块,用于处理与解析 URL。

### 1. URL 对象都有哪些属性 ?

```js
const { URL } = require("url");

const myURL = new URL("https://github.com/webfansplz#hello");
console.log(myURL);
{
  href: 'https://github.com/webfansplz#hello',  // 序列化的 URL
  origin: 'https://github.com', // 序列化的 URL 的 origin
  protocol: 'https:', // URL 的协议
  username: '', // URL 的用户名
  password: '', //  URL 的密码
  host: 'github.com', // URL 的主机
  hostname: 'github.com',   // URL 的主机名
  port: '',  // URL 的端口
  pathname: '/webfansplz',  // URL 的路径
  search: '', // URL 的序列化查询参数
  searchParams: URLSearchParams {}, //  URL 查询参数的 URLSearchParams 对象
  hash: '#hello'  // URL 的片段
}
```

URL 对象属性 除了 origin 和 searchParams 是只读的,其他都是可写的.

### 2. 序列化 URL

```js
const { URL } = require('url')

const myURL = new URL('https://github.com/webfansplz#hello')

console.log(myURL.href) //  https://github.com/webfansplz#hello

console.log(myURL.toString()) // https://github.com/webfansplz#hello

console.log(myURL.toJSON()) //  https://github.com/webfansplz#hello
```

<h2 id="7">7. 压缩 zlib 模块</h2>

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
const zlib = require('zlib')
const fs = require('fs')
const gzip = zlib.createGzip()
const inp = fs.createReadStream('zlib.txt')
const out = fs.createWriteStream('zlib.txt.gz')
inp.pipe(gzip).pipe(out)
```

#### 文件解压

```js
const zlib = require('zlib')
const fs = require('fs')
const gunzip = zlib.createGunzip()
const inp = fs.createReadStream('./un-zlib.txt.gz')
const out = fs.createWriteStream('un-zlib.txt')
inp.pipe(gunzip).pipe(out)
```

### 2. 服务端 gzip 压缩

```js
const fs = require('fs')
const http = require('http')
const zlib = require('zlib')
const filepath = './index.html'

const server = http.createServer((req, res) => {
  const acceptEncoding = req.headers['accept-encoding']
  if (acceptEncoding.includes('gzip')) {
    const gzip = zlib.createGzip()
    res.writeHead(200, {
      'Content-Encoding': 'gzip'
    })
    fs.createReadStream(filepath)
      .pipe(gzip)
      .pipe(res)
  } else {
    fs.createReadStream(filepath).pipe(res)
  }
})

server.listen(4396)
```

<h2 id="8">8. 流 stream 模块</h2>

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
const http = require('http')

const server = http.createServer((req, res) => {
  // req 是一个 http.IncomingMessage 实例，它是可读流。
  // res 是一个 http.ServerResponse 实例，它是可写流。

  let body = ''
  // 接收数据为 utf8 字符串，
  // 如果没有设置字符编码，则会接收到 Buffer 对象。
  req.setEncoding('utf8')

  // 如果添加了监听器，则可读流会触发 'data' 事件。
  req.on('data', chunk => {
    body += chunk
  })

  // 'end' 事件表明整个请求体已被接收。
  req.on('end', () => {
    try {
      const data = JSON.parse(body)
      // 响应信息给用户。
      res.write(typeof data)
      res.end()
    } catch (er) {
      // json 解析失败。
      res.statusCode = 400
      return res.end(`错误: ${er.message}`)
    }
  })
})

server.listen(1337)

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

<h2 id="9">9. 逐行读取 readline 模块</h2>

readline 模块是一个流内容的逐行读取模块，通过 require('readline')引用模块。你可以用 readline 模块来读取 stdin，可以用来逐行读取文件流，也可用它来在控制台和用户进行一些交互。

```js
const readline = require('readline')

const rl = readline.createInterface({
  //  监听的可读流
  input: process.stdin,
  //  逐行读取（Readline）数据要写入的可写流
  output: process.stdout
})

rl.question('你如何看待 null-cli ？', answer => {
  console.log(`感谢您的宝贵意见：${answer}`)
  rl.close()
})
```

![readline](https://raw.githubusercontent.com/webfansplz/article/master/meetNodejs/readline/readline.gif)

很多有趣的 CLI 工具是基于 readline 造的哦,有兴趣的同学也可以尝试~

<h2 id="10">10. 查询字符串 querystring 模块</h2>

querystring 模块是 Node.js 中的工具模块之一，用于处理 URL 中的查询字符串，即：querystring 部分。查询字符串指：URL 字符串中，从问号"?"(不包括?)开始到锚点"#"或者到 URL 字符串的结束（存在#，则到＃结束，不存在则到 URL 字符串结束）的部分叫做查询字符串。querystring 模块可将 URL 查询字符串解析为对象，或将对象序列化为查询字符串。

### 1. 对象序列化为查询字符串

querystring.stringify(obj[, sep][, eq][, options])

```js
const querystring = require('querystring')

const obj = {
  url: 'github.com/webfansplz',
  name: 'null'
}

console.log(querystring.stringify(obj)) // url=github.com%2Fwebfansplz&name=null
```

### 2. 查询字符串解析为对象

```js
const querystring = require('querystring')

const o = querystring.parse(`url=github.com%2Fwebfansplz&name=null`)

console.log(o.url) // github.com/webfansplz
```

### 3. 编码查询字符串中的参数

querystring.escape 方法会对查询字符串进行编码，在使用 querystring.stringify 方法时可能会用到.

```js
const str = querystring.escape(`url=github.com%2Fwebfansplz&name=null`)

console.log(str) // url%3Dgithub.com%252Fwebfansplz%26name%3Dnull
```

### 4. 解码查询字符串中的参数

querystring.unescape 方法是和 querystring.escape 相逆的方法，在使用 querystring.parse 方法时可能会用到。

```js
const str = querystring.escape(`url=github.com%2Fwebfansplz&name=null`)

console.log(querystring.parse(str)) // { 'url=github.com%2Fwebfansplz&name=null': '' } ✖️

console.log(querystring.parse(querystring.unescape(str))) // { url: 'github.com/webfansplz', name: 'null' }
```

<h2 id="11">11. module 模块</h2>

> Node.js 实现了一个简单的模块加载系统。在 Node.js 中，文件和模块是一一对应的关系，可以理解为一个文件就是一个模块。其模块系统的实现主要依赖于全局对象 module，其中实现了 exports(导出)、require()(加载)等机制。

### 1. 模块加载

Node.js 中一个文件就是一个模块。如，在 index.js 中加载同目录下的 circle.js：

```js
// circle.js
const PI = Math.PI

exports.area = r => PI * r * r

exports.circumference = r => 2 * PI * r
```

```js
// index.js
const circle = require('./circle.js')

console.log(`半径为 4 的圆面积为 ${circle.area(4)}`) // 半径为 4 的圆面积为 50.26548245743669
```

circle.js 中通过 exports 导出了 area()和 circumference 两个方法，这两个方法可以其它模块中调用。

#### exports 与 module.exports

exports 是对 module.exports 的一个简单引用。如果你需要将模块导出为一个函数(如：构造函数)，或者想导出一个完整的出口对象而不是做为属性导出，这时应该使用 module.exports。

```js
// square.js

module.exports = width => {
  return {
    area: () => width * width
  }
}
```

```js
// index.js

const square = require('./square.js')
const mySquare = square(2)
console.log(`The area of my square is ${mySquare.area()}`) // The area of my square is 4
```

### 2. 访问主模块

当 Node.js 直接运行一个文件时，require.main 属性会被设置为 module 本身。这样，就可通过这个属性判断模块是否被直接运行：

```js
require.main === module
```

比如,对于上面例子的 index.js 来说, node index.js 上面值就是 true, 而通过 require('./index')时, 值却是 false.

module 提供了一个 filename 属性，其值通常等于\_\_filename。 所以，当前程序的入口点可以通过 require.main.filename 来获取。

```js
console.log(require.main.filename === __filename) // true
```

### 3. 解析模块路径

使用 require.resolve()函数,可以获取 require 加载的模块的确切文件名,此操作只返回解析后的文件名，不会加载该模块。

```js
console.log(require.resolve('./square.js')) // /Users/null/meet-nodejs/module/square.js
```

require.resolve 的工作过程：

```js
require(X) from module at path Y
1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
3. LOAD_NODE_MODULES(X, dirname(Y))
4. THROW "not found"

LOAD_AS_FILE(X)
1. If X is a file, load X as JavaScript text.  STOP
2. If X.js is a file, load X.js as JavaScript text.  STOP
3. If X.json is a file, parse X.json to a JavaScript Object.  STOP
4. If X.node is a file, load X.node as binary addon.  STOP

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. let M = X + (json main field)
   c. LOAD_AS_FILE(M)
2. If X/index.js is a file, load X/index.js as JavaScript text.  STOP
3. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
4. If X/index.node is a file, load X/index.node as binary addon.  STOP

LOAD_NODE_MODULES(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   c. DIR = path join(PARTS[0 .. I] + "node_modules")
   b. DIRS = DIRS + DIR
   c. let I = I - 1
5. return DIRS
```

### 4. 模块缓存

模块在第一次加载后会被缓存到 require.cache 对象中, 从此对象中删除键值对将会导致下一次 require 重新加载被删除的模块。

多次调用 require('index')，未必会导致模块中代码的多次执行。这是一个重要的功能，借助这一功能，可以返回部分完成的对象；这样，传递依赖也能被加载，即使它们可能导致循环依赖。

如果你希望一个模块多次执行，那么就应该输出一个函数，然后调用这个函数。

#### 模块缓存的注意事项

模块的基于其解析后的文件名进行缓存。由于调用的位置不同，可能会解析到不同的文件(如，需要从 node_modules 文件夹加载的情况)。所以，当解析到其它文件时，就不能保证 require('index')总是会返回确切的同一对象。

另外，在不区分大小写的文件系统或系统中，不同的文件名可能解析到相同的文件，但缓存仍会将它们视为不同的模块，会多次加载文件。如：require('./index')和 require('./INDEX')会返回两个不同的对象，无论'./index'和'./INDEX'是否是同一个文件。

### 5. 循环依赖

当 require()存在循环调用时，模块在返回时可能并不会被执行。

```js
// a.js
console.log('a starting')
exports.done = false
const b = require('./b.js')
console.log('in a, b.done = %j', b.done)
exports.done = true
console.log('a done')
```

```js
// b.js
console.log('b starting')
exports.done = false
const a = require('./a.js')
console.log('in b, a.done = %j', a.done)
exports.done = true
console.log('b done')
```

```js
// main.js
console.log('main starting')
const a = require('./a.js')
const b = require('./b.js')
console.log('in main, a.done=%j, b.done=%j', a.done, b.done)
```

首先 main.js 会加载 a.js，接着 a.js 又会加载 b.js。这时，b.js 又会尝试去加载 a.js。

为了防止无限的循环，a.js 会返回一个 unfinished copy 给 b.js。然后 b.js 就会停止加载，并将其 exports 对象返回给 a.js 模块。

这样 main.js 就完成了 a.js、b.js 两个文件的加载。输出如下:

```js
$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done=true, b.done=true
```

### 6. 文件模块

当加载文件模块时，如果按文件名查找未找到。那么 Node.js 会尝试添加.js 和.json 的扩展名，并再次尝试查找。如果仍未找到，那么会添加.node 扩展名再次尝试查找。

对于.js 文件，会将其解析为 JavaScript 文本文件；而.json 会解析为 JOSN 文件文件；.node 会尝试解析为编译后的插件文件，并由 dlopen 进行加载。

#### 路径解析

当加载的文件模块使用'/'前缀时，则表示绝对路径。如，require('/home/null/index.js')会加载/home/null/index.js 文件。

而使用'./'前缀时，表示相对路径。如，在 index.js 中 require('./circle')引用时，circle.js 必须在相同的目录下才能加载成功。

当没有'/'或'./'前缀时，所引用的模块必须是“核心模块”或是 node_modules 中的模块。

如果所加载的模块不存在，require()会抛出一个 code 属性为'MODULE_NOT_FOUND'的错误。

### 7. \_\_dirname

当前模块的目录名。 与 \_\_filename 的 path.dirname() 相同。

```js
console.log(__dirname) // /Users/null/meet-nodejs/module

console.log(require('path').dirname(__filename)) // /Users/null/meet-nodejs/module

console.log(__dirname === require('path').dirname(__filename)) // true
```

### 8. module 对象

module 在每个模块中表示对当前模块的引用。 而 module.exports 又可以通过全局对象 exports 来引用。module 并不是一个全局对象，而更像一个模块内部对象。

#### module.children

这个模块引入的所有模块对象

#### module.exports

module.exports 通过模块系统创建。有时它的工作方式与我们所想的并不一致，有时我们希望模块是一些类的实例。因此，要将导出对象赋值给 module.exports，但是导出所需的对象将分配绑定本地导出变量，这可能不是我们想要的结果。

```js
// a.js

const EventEmitter = require('events')

module.exports = new EventEmitter()

// Do some work, and after some time emit
// the 'ready' event from the module itself.
setTimeout(() => {
  module.exports.emit('ready')
}, 1000)
```

```js
const a = require('./a')
a.on('ready', () => {
  console.log('module a is ready')
})
```

需要注意，分配给 module.exports 的导出值必须能立刻获取到，当使用回调时其不能正常执行。

#### exports 别名

exports 可以做为 module.exports 的一个引用。和任何变量一样，如果为它分配新值，其旧值将会失效：

```js
function require(...) {
  // ...
  ((module, exports) => {
    // Your module code here
    exports = some_func;        // re-assigns exports, exports is no longer
                                // a shortcut, and nothing is exported.
    module.exports = some_func; // makes your module export 0
  })(module, module.exports);
  return module;
}

```

- module.filename - 模块解析后的完整文件名

- module.id - 用于区别模块的标识符，通常是完全解析后的文件名。

- module.loaded - 模块是否加载完毕

- module.parent - 父模块，即：引入这个模块的模块

- module.require(id)

- module.require 提供了类似 require()的功能，可以从最初的模块加载一个模块

<h2 id="12">12. 缓冲器 Buffer 模块</h2>

在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。

### 创建缓冲区

```js
console.log(Buffer.from([1, 2, 3, 4, 5])) // <Buffer 01 02 03 04 05>

console.log(Buffer.from(new ArrayBuffer(8))) // <Buffer 00 00 00 00 00 00 00 00>

console.log(Buffer.from('Hello world')) // <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
```

### Buffer 与字符编码

当字符串数据被存储入 Buffer 实例或从 Buffer 实例中被提取时，可以指定一个字符编码。

```js
// 缓冲区转换为 UTF-8 格式的字符串

const buffer = Buffer.from('Hello world')

console.log(buffer.toString()) // Hello world
```

```js
// 缓冲区数据转换为base64格式字符串

const buffer = Buffer.from('Hello world')

console.log(buffer.toString('base64')) // SGVsbG8gd29ybGQ=
```

```js
// 将base64编码的字符串，转换为UTF-8编码

const buffer = Buffer.from('Hello world')

const base64Str = buffer.toString('base64')

const buf = Buffer.from(base64Str, 'base64')

console.log(buf.toString('utf8')) // Hello world
```

<h2 id="13">13. 域名服务器 dns 模块</h2>

DNS（Domain Name System，域名系统），DNS 协议运行在 UDP 协议之上，使用端口号 53。DNS 是因特网上作为域名和 IP 地址相互映射的一个分布式数据库，能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的 IP 数串。简单的说，就是把域名（网址）解析成对应的 IP 地址。Node.js 的 dns 模块，提供了 DNS 解析功能。当使用 dns 模块中的 net.connect(80, 'github.com/webfansplz')方法 或 http 模块的 http.get({ host: 'github.com/webfansplz' })方法时，在其底层会使用 dns 模块中的 dns.lookup 方法进行域名解析。

### dns 模块的两种域名解析方式

#### 1.使用操作系统底层的 DNS 服务解析

使用操作系统底层的 DNS 服务进行域名解析时，不需要连接到网络仅使用系统自带 DNS 解析功能。这个功能由 dns.lookup()方法实现。

dns.lookup(hostname[, options], callback)：将一个域名（如：'www.baidu.com'）解析为第一个找到的 A 记录（IPv4）或 AAAA 记录（IPv6）

hostname 表示要解析的域名。

options 可以是一个对象或整数。如果没有提供 options 参数，则 IP v4 和 v6 地址都可以。如果 options 是整数，则必须是 4 或 6。如果 options 是对象时，会包含以下两个可选参数：

- family：可选，IP 版本。如果提供，必须是 4 或 6。不提供则，IP v4 和 v6 地址都可以

- hints：可选。如果提供，可以是一个或者多个 getaddrinfo 标志。若不提供，则没有标志会传给 getaddrinfo。

callback 回调函数，参数包含(err, address, family)。出错时，参数 err 是 Error 对象。address 参数表示 IP v4 或 v6 地址。family 参数是 4 或 6，表示 address 协议版本。

```js
const dns = require('dns')

dns.lookup(`www.github.com`, (err, address, family) => {
  if (err) throw err
  console.log('地址: %j 地址族: IPv%s', address, family) // 地址: "13.229.188.59" 地址族: IPv4
})
```

#### 2.连接到 DNS 服务器解析域名

在 dns 模块中，除 dns.lookup()方法外都是使用 DNS 服务器进行域名解析，解析时需要连接到网络。

dns.resolve(hostname[, rrtype], callback)：将一个域名（如 'www.baidu.com'）解析为一个 rrtype 指定类型的数组

hostname 表示要解析的域名。

rrtype 有以下可用值:

| rrtype  |   records 包含   | 结果的类型 |      快捷方法      |
| :-----: | :--------------: | :--------: | :----------------: |
|   'A'   | IPv4 地址 (默认) |   string   |   dns.resolve4()   |
| 'AAAA'  |    IPv6 地址     |   string   |   dns.resolve6()   |
|  'ANY'  |     任何记录     |   Object   |  dns.resolveAny()  |
| 'CNAME' |   规范名称记录   |   string   | dns.resolveCname() |
|  'MX'   |   邮件交换记录   |   Object   |  dns.resolveMx()   |
| 'NAPTR' | 名称权限指针记录 |   Object   | dns.resolveNaptr() |
|  'NS'   |  名称服务器记录  |   string   |  dns.resolveNs()   |
|  'PTR'  |     指针记录     |   string   |  dns.resolvePtr()  |
|  'SOA'  |   开始授权记录   |   Object   |  dns.resolveSoa()  |
|  'SRV'  |     服务记录     |   Object   |  dns.resolveSrv()  |
|  'TXT'  |     文本记录     |  string[]  |  dns.resolveTxt()  |

callback 回调函数，参数包含(err, addresses)。出错时，参数 err 是 Error 对象。addresses 根据记录类型的不同返回值也不同。

```js
const dns = require('dns')

dns.resolve('www.baidu.com', 'A', (err, addresses) => {
  if (err) throw err
  console.log(`IP地址 : ${JSON.stringify(addresses)}`) // IP地址 : ["163.177.151.110","163.177.151.109"]
})

// or

dns.resolve4('www.baidu.com', (err, addresses) => {
  if (err) throw err
  console.log(`IP地址 : ${JSON.stringify(addresses)}`) // IP地址 : ["163.177.151.110","163.177.151.109"]
})
```

### 反向 DNS 查询

#### 将 IPv4 或 IPv6 地址解析为主机名数组。

使用 getnameinfo 方法将传入的地址和端口解析为域名和服务

dns.reverse(ip, callback)

ip 表示要反向解析的 IP 地址。

callback 回调函数，参数包含(err, domains)。出错时，参数 err 是 Error 对象。domains 解析后的域名数组。

```js
dns.reverse('8.8.8.8', (err, domains) => {
  if (err) throw err
  console.log(domains) // [ 'dns.google' ]
})
```

dns.lookupService(address, port, callback)

address 表示要解析的 IP 地址字符串。

port 表示要解析的端口号。

callback 回调函数，参数包含(err, hostname, service)。出错时，参数 err 是 Error 对象。

```js
dns.lookupService('127.0.0.1', 80, function(err, hostname, service) {
  if (err) throw err
  console.log('主机名：%s，服务类型：%s', hostname, service) // 主机名：localhost，服务类型：http
})
```
